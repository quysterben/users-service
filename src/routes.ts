import { verifyGatewayRequest } from '@quysterben/jobber-shared';
import { Application } from 'express';

const BUYER_BASE_PATH = '/api/v1/buyer';
const SELLER_BASE_PATH = '/api/v1/seller';

const appRoutes = (app: Application): void => {
  app.use('', () => console.log('health'));

  app.use(BUYER_BASE_PATH, verifyGatewayRequest, () => console.log('buyer'));
  app.use(SELLER_BASE_PATH, verifyGatewayRequest, () => console.log('seller'));
};

export { appRoutes };
