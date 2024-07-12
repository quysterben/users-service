import { Application } from 'express';
import { verifyGatewayRequest } from '@quysterben/jobber-shared';
import { buyerRoutes } from '@users/routes/buyer.routes';
import { healthRoutes } from '@users/routes/health.routes';
import { sellerRoutes } from '@users/routes/seller.routes';

const BUYER_BASE_PATH = '/api/v1/buyer';
const SELLER_BASE_PATH = '/api/v1/seller';

const appRoutes = (app: Application): void => {
  app.use('', healthRoutes());

  app.use(BUYER_BASE_PATH, verifyGatewayRequest, buyerRoutes());
  app.use(SELLER_BASE_PATH, verifyGatewayRequest, sellerRoutes());
};

export { appRoutes };
