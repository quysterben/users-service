import { Logger } from 'winston';
import { winstonLogger } from '@quysterben/jobber-shared';
import { config } from '@users/config';
import { Channel } from 'amqplib';
import { createConnection } from '@users/queues/connetion';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'UsersServiceQueueConnection', 'debug');

const publishDirectMessage = async (
  channel: Channel,
  exchangeName: string,
  routingKey: string,
  message: string,
  logMessage: string
): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    await channel.assertExchange(exchangeName, 'direct');
    channel.publish(exchangeName, routingKey, Buffer.from(message));
    log.info(logMessage);
  } catch (error) {
    log.log('error', 'UserService error publishDirectMessage() method:', error);
  }
};

export { publishDirectMessage };
