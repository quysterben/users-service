import client, { Channel, Connection } from 'amqplib';
import { winstonLogger } from '@quysterben/jobber-shared';
import { config } from '@users/config';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'UserServiceQueueConnection', 'debug');

async function createConnection(): Promise<Channel | undefined> {
  try {
    const connection: Connection = await client.connect(`${config.RABBITMQ_ENDPOINT}`);
    const channel: Channel = await connection.createChannel();
    log.info('UserService connected to queue successfully...');
    closeConnection(channel, connection);
    return channel;
  } catch (error) {
    log.log('error', 'UserService error createConnection() method:', error);
    return undefined;
  }
}

function closeConnection(channel: Channel, connection: Connection): void {
  process.once('SIGINT', async () => {
    await channel.close();
    await connection.close();
  });
}

export { createConnection };
