const index = require('./index'); // 本体コードを読み込み

const event = { // eventオブジェクトを作成
  // ...
};

const context = { // contextオブジェクトを作成
  // ...
};

const callback = function (error, response) { // callback関数を作成
  if (error) {
    console.log(error);
  } else {
    console.log(response);
  }
};

index.handler(event, context, callback); // 本体コードのhandler関数を実行
