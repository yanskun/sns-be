import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/routes';

const port =
  process.env.NODE_ENV === 'production'
    ? 'https://door-server-728fb.web.app/'
    : 3300;

async function bootstrap() {
  const app = express();

  app.use(bodyParser.json());
  app.use('/', router);

  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });
}

bootstrap();
