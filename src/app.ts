import 'reflect-metadata';
import express from 'express';
import router from './routes/routes';

const port = process.env.PORT || 3300;

async function bootstrap() {
  const app = express();

  app.use('/ogp', router);

  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });
}

bootstrap();
