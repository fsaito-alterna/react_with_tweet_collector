# 概要

TwitterAPIを利用し、特定のキーワードで検索を行い
ヒットしたツイートを全てS3に保存するLambdaのスクリプトです。

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

zip -r generate_summary.zip index.js config lib node_modules
