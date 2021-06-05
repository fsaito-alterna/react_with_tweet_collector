'use strict';

const env = process.env;

const _ = require('lodash');
const RSS = require('rss');
const AWS = require('aws-sdk');

// 設定を読み込む
AWS.config.loadFromPath('./config/aws.json');
const s3 = new AWS.S3();

const feedOption = {
  title: 'タイトル',
  description: 'description',
  feed_url: 'https://sample-web.com/rss.xml',
  site_url: 'https://sample-web.com',
  hub: 'https://pubsubhubbub.appspot.com/',
  custom_namespaces: {
    content: 'http://purl.org/rss/1.0/modules/content/',
    wfw: 'http://wellformedweb.org/CommentAPI/',
    dc: 'http://purl.org/dc/elements/1.1/',
    atom: 'http://www.w3.org/2005/Atom',
  },
}
const feed = new RSS(feedOption);

//console.log(env);

const deployName = 'sample-web.com';

const generateRSS = async (bucketName, newFeeds) => {
  if (!newFeeds || newFeeds.length === 0) {
    return 0;
  }
  try {
    const oldFeeds = await getStoredFeeds(bucketName);
    const mergedFeeds = newFeeds.concat(oldFeeds).slice(0, 10);
    mergedFeeds.forEach(item => {
      feed.item(item);
    });
    const rss = feed.xml({indent: true});
    await storeFeeds(bucketName, newFeeds);
    await storeRSS(deployName, rss);
    return rss;
  } catch(e) {
    console.log(e);
    return e;
  }
};

const storeRSS = async (bucketName, rss) => {
  const params = {
    Bucket: bucketName,
    Key: 'rss.xml',
    ContentType:'application/rss+xml; charset="UTF-8"',
    Body: rss,
  }

  return s3.putObject(params).promise();
}

const storeFeeds = async (bucketName, metadata) => {
  const params = {
    Bucket: bucketName,
    Key: 'feeds.json',
    ContentType:'application/json',
    Body: JSON.stringify(metadata, null, 2),
  }

  return s3.putObject(params).promise();
}

const getStoredFeeds = async (bucketName) => {
  const params = {
    Bucket: bucketName,
    Key: 'feeds.json',
  }

  try {
    const data = await s3.getObject(params).promise();
    return JSON.parse(data.Body.toString()) || [];
  } catch(e) {
    return [];
  }
}

module.exports = {
  generateRSS,
}