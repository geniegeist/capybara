import express from 'express';
import createRouter from './router';

export default function createServer() {
  const app = express();

  app.use('/api/v1', createRouter());

  return app;
}
