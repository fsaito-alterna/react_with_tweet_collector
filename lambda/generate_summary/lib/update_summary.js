'use strict';

const env = process.env;

const _ = require('lodash');
const moment = require('moment');
const AWS = require('aws-sdk');

// 設定を読み込む
AWS.config.loadFromPath('./config/aws.json');
const s3 = new AWS.S3();

//console.log(env);

const LENGTH = 20;
const BUCKET_PREFIX = 'sample-web-ids-' // S3のバケットprefix


const updateSummary = async (bucketName) => {
  console.log(bucketName);

  let metadata = {};
  let feeds = [];

  try {
    const oldMetadata = await getStoredMetadata(bucketName);
    const objects = await getKeywordsFromS3();
    await Promise.all(objects.map(async (object) => {
      try {
        const ids = await getTweetsFromS3(object.bucket);
        const result = updateMetadata(object, oldMetadata[object.bucket], ids);
        if (result) {
          metadata[object.bucket] = result;
          feeds = result.is_update ? feeds.concat([{
            title: `【画像】[${result.update_length}件更新]｜${object.keyword} ツイートまとめ`,
            description: 'use this for the content. It can include html.',
            url: `https://sample-web.com/#/${result.tag}?id=${moment().unix()}`, // link to the item
            categories: ['Twitter','画像ツイート'], // optional - array of item categories
            author: 'sample-web.com', // optional - defaults to feed author property
            date: new Date(), // any format that js Date can parse.
          }]) : feeds;
        }
      } catch (e) {
        console.log(e);
      }
    }));
    await storeMetadata(bucketName, metadata);
    await storeMetadata('sample-web.com', metadata);
  } catch(e) {
    console.log(e);
  }
  return feeds;
};

const updateMetadata = (object, old, ids) => {
  if (!ids || ids.length === 0) {
    return null;
  }

  const length = ids.length;

  if (!old) {
    return {
      hash: object.keyword,
      tag: object.bucket.replace(BUCKET_PREFIX, ''),
      id: ids[length - 1],
      all_length: length,
      update_length: length,
      is_update: true
    }
  } else if (length - old.all_length > LENGTH){
    return {
      ...old,
      id: ids[length - 1],
      all_length: length,
      "update_length": length - old.all_length,
      is_update: true
    }
  }
  return {
    ...old,
    is_update: false,
  }
}

const storeMetadata = async (bucketName, metadata) => {
  const params = {
    Bucket: bucketName,
    Key: 'summary.json',
    ContentType:'application/json',
    Body: JSON.stringify(metadata, null, 2),
  }

  return s3.putObject(params).promise();
}

const getStoredMetadata = async (bucketName) => {
  const params = {
    Bucket: bucketName,
    Key: 'summary.json',
  }

  try {
    const data = await s3.getObject(params).promise();
    return JSON.parse(data.Body.toString()) || {};
  } catch(e) {
    return {};
  }
}

const getTweetsFromS3 = async (bucketName) => {
  let ids = [];
  let params = {
    Bucket: bucketName,
  }
  while(true) {
    const listObjects = await s3.listObjectsV2(params).promise();
    if (listObjects && listObjects.Contents.length > 0) {
      const items = listObjects.Contents.map((item) => {
        return item.Key;
      });
      ids = ids.concat(items);
      if (listObjects.Contents.length === 1000) {
        params.ContinuationToken = listObjects.NextContinuationToken;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  return ids;
}

const getKeywordsFromS3 = async () => {
  let result;
  const listObjects = await s3.listObjectsV2({Bucket: env.KEYWORDS_BUCKET_NAME}).promise();

  if (listObjects.Contents.find( content => content.Key === env.JSON_NAME ) !== undefined) {
    const object = await s3.getObject({Bucket: env.KEYWORDS_BUCKET_NAME, Key: env.JSON_NAME}).promise();
    result = JSON.parse(object.Body.toString()).search_words;
  }
  return result;
}


module.exports = {
  updateSummary,
}