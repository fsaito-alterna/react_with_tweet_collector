'use strict';

const { twitterLib } = require('./lib/twitter');

exports.handler = async (event, context, callback) => {
  const result = await twitterLib(event);
  console.log('script end');
};
