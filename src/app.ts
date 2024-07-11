import { config } from '@users/config';
import { databaseConnection } from '@users/database';
import express, { Express } from 'express';
import { start } from '@users/server';

const intialize = (): void => {
  config.cloudinaryConfig();
  databaseConnection();
  const app: Express = express();
  start(app);
};

intialize();
