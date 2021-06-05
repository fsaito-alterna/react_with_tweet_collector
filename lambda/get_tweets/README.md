# 概要

TwitterAPIを利用し、特定のキーワード + `filter:images` で画像検索を行い
ヒットした画像を全てS3に保存するLambdaのスクリプトです。
同じツイート画像を保存させないためにTwitterAPIでは`since_id`を利用して検索しています。

# ローカル開発環境

* node version 6.10 以降

# 事前準備

* aws側でlambda用のiamのユーザー作成（ルートユーザーでも良いので必須ではない）
  * accessKeyIdとsecretを保存しておく
* s3にbucketを作成しておく
  * twitter検索履歴保存用の空のjsonファイルを置いておく
* twitter dev でアプリを作りkeyやtoken等を用意しておく


# 準備

`config` ディレクトリ下に `aws.json` `twitter.json`ファイルを追加して自身のkey等を追加してください。


## example aws.json
```:json

{
  "accessKeyId": "your_access_key_id",
  "secretAccessKey": "your_access_key",
  "region": "region_for_s3",
  "bucketName": "bucket_name_for_s3",
  "metaFileKey": "your_twitter_search_meta_file_name.json"　// ツイッターの検索履歴を保存するjson形式のファイル
}

```

## example aws.json
```:json

{
  "search_word": "#キーワード",
  "consumer_key": "your_consumer_key",
  "consumer_secret": "your_consumer_secret",
  "access_token_key": "your_access_token_key",
  "access_token_secret": "your_token_secret",
  "max_history_length": 10000
}

```


# 使い方

```
cd lambda_image_collector
npm install

```

## Local exec.

$ node -r dotenv/config localRun.js

## Packaging zip and upload to AWS Lambda.

zip -r get_tweets_to_s3.zip index.js config lib node_modules

# 開発が終わったら..

* zipにまとめてawsのlambdaコンソールにアップロードしテストをする。

# 参考リンク

* http://docs.aws.amazon.com/ja_jp/lambda/latest/dg/welcome.html
* https://dev.twitter.com/rest/public