import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';
import { config } from '@users/config';
import { winstonLogger } from '@quysterben/jobber-shared';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationElasticSearchServer', 'debug');

const elasticSearchClient = new Client({
  node: `${config.ELASTIC_SEARCH_URL}`
});

const checkConnection = async (): Promise<void> => {
  let isConnected = false;
  while (!isConnected) {
    try {
      const health: ClusterHealthResponse = await elasticSearchClient.cluster.health({});
      log.info(`Users Service Elasticsearch health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.error('Error connecting to ElasticSearch');
      log.log('error', 'Users Service checkConnection() method:', error);
    }
  }
};

export { checkConnection };
