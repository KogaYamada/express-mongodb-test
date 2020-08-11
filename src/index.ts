import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './routes';
import errorMiddleware from './middleware/error';

const app = express();
const port: number = 3000;

// mongoDBに接続
mongoose.connect('mongodb://localhost:27017/express-test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.Promise = global.Promise;

// postリクエストを受け取るための設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// /api以下にルートを作成
app.use('api', router);

// エラーハンドリング
app.use('/', errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

// サーバー
app.listen(port, () => {
  console.log(`server listening on port ${port}...`);
});

export default app;
