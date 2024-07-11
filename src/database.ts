import { winstonLogger } from '@quysterben/jobber-shared';
import { Logger } from 'winston';
import { config } from '@users/config';
import mongoose from 'mongoose';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'UsersDatabaseServer', 'debug');

const databaseConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(`${config.DATABASE_URL}`);
    log.info('UsersService Database Connected');
  } catch (error) {
    log.log('error', 'UsersService databaseConnection() Error', error);
  }
};

export { databaseConnection };