# react_with_tweet_collector

## 概要

LambdaバッチにてS3へ特定のハッシュタグ等の、twitterの`tweet id`を収集、保存し、React側のWebサイトにて参照するもの。
twitterのAPIではある一定より古いtweetを参照することはできないが、予め収集しておき、`id`から参照すれば古いツイートも見ることができる、かもしれない。
画像等の素材収集は本実装では行わない。

WebサイトへのデプロイはAmazon S3、収集機能はAWS Lambda、ファイル保存先はS3で機能するため、サーバーレスアーキテクチャになっており
サーバーレンタルサービスは不要なので、運用する場合もかなり低額の運用費で扱える。

* client

ReactによるWebフロントエンド実装

* lambda

tweet収集を行うLambdaバッチ実装


## Client

コマンド等はpackage.json参照

### debug

```
npm run watch
```

### lint
```
npm run format
npm run lint
```

### build

```
npm run build
```

### deploy

public配下に出力されたファイルを任意のS3等に配置する
