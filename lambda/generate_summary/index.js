'use strict';

const { updateSummary } = require('./lib/update_summary');
const { generateRSS } = require('./lib/generate_rss');

exports.handler = async (event, context, callback) => {
  const summaryBucket = "summary-bucket";
  const feeds = await updateSummary(summaryBucket);
  console.log(feeds);
  const rss = await generateRSS(summaryBucket, feeds);
  console.log(rss);
  console.log('script end');
};
