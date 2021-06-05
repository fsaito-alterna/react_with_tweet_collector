'use strict';

const env = process.env;

const _ = require('lodash');

const AWS = require('aws-sdk');
const TwitterClient = require('twitter');

// 設定を読み込む
AWS.config.loadFromPath('./config/aws.json');
const s3 = new AWS.S3();

//console.log(env);

const twitter = new TwitterClient({
  consumer_key: env.CONSUMER_KEY,
  consumer_secret: env.CONSUMER_SECRET,
  access_token_key: env.ACCESS_TOKEN_KEY,
  access_token_secret: env.ACCESS_TOKEN_SECRET,
});

const META_DATA_BUCKET = 'sample-web-metadata' // S3のmetadataバケット


const twitterLib = async (conf) => {
  const queryStr = _.get(conf, 'keyword', '');
  const bucketName = _.get(conf, 'bucket', '');
  console.log(queryStr);
  console.log(bucketName);

  let metadata = {};

  if (env.REQUEST_TYPE === 'old') {
    let allTweets = [];
    let maxId = null;

    try {
      while(true) {
        const result = await getTweets(queryStr, null, maxId) || [];
        metadata = metadata || { ...result.metadata, since_id: result.metadata.max_id };
        const tweets = result.tweets;
        if ((tweets && tweets.length === 0) || ( maxId && _.last(tweets).id >= maxId)) {
          break;
        }
        allTweets = allTweets.concat(tweets);
        console.log(allTweets.length);
        maxId = _.last(tweets).id - 1;
        console.log(maxId);
        console.log(_.last(tweets).id_str);
      }
    } catch(e) {
      console.log(e)
    }
    await storeSearchTweets(bucketName, allTweets);
    await storeMetadata(bucketName, metadata);
  } else {
    console.log('new');
    try {
      metadata = await getStoredMetadata(bucketName);
    } catch(e) {
      console.log(e)
    }
    try {
      const sinceId = metadata ? metadata.since_id : null
      const result = await getTweets(queryStr, sinceId, null) || [];
      //console.log(result);
      
      if (result && result.tweets && result.tweets.length > 0) {
        await storeSearchTweets(bucketName, result.tweets);
        await storeMetadata(bucketName, result.metadata);
      }
      
    } catch(e) {
      console.log(e);
    }
    console.log('end');
  }
};

const getTweets = async (queryStr, sinceId, maxId) => {
  let params = {
    q: `${queryStr} filter:media`,
    count: 100,
    // result_type: 'recent',
  };

  if (sinceId) {
    params = {
      ...params,
      since_id: sinceId,
    }
  }

  if (maxId) {
    params = {
      ...params,
      max_id: maxId,
    }
  }
  console.log(params);

  try {
    const result = await twitter.get('search/tweets', params);
    //console.log(result);
    const filtered = result.statuses.filter((tweet) => {
        return !tweet.retweeted_status;
    });
    console.log(filtered);
    console.log(filtered.length);
    return {tweets: filtered, metadata: result.search_metadata};
  } catch(e) {
    console.log(e);
    return e;
  }
}

const storeSearchTweets = async (bucketName, tweets) => {
  return await Promise.all(tweets.map(async (tweet) => {
    const params = {
      Bucket: bucketName,
      Key: tweet.id_str,
      Body: '',
    }
    return await s3.putObject(params).promise();
  }));
}

const storeMetadata = async (bucketName, metadata) => {
  const params = {
    Bucket: META_DATA_BUCKET,
    Key: `${bucketName}.json`,
    ContentType:'application/json',
    Body: JSON.stringify(metadata, null, 2),
  }

  return s3.putObject(params).promise();
}

const getStoredMetadata = async (bucketName) => {
  const params = {
    Bucket: META_DATA_BUCKET,
    Key: `${bucketName}.json`,
  }

  try {
    console.log(params);
    const data = await s3.getObject(params).promise();
    console.log(data.Body.toString());
    return JSON.parse(data.Body.toString()) || {};
  } catch(e) {
    console.log(e);
  }
}

module.exports = {
  twitterLib,
}