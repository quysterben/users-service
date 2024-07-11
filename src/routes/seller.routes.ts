import express, { Router } from 'express';
import { seller as createSeller } from '@users/controllers/seller/create';
import { seller as updateSeller } from '@users/controllers/seller/update';

const router: Router = express.Router();

const sellerRoutes = (): Router => {
  router.post('/create', createSeller);
  router.put('/:sellerId', updateSeller);
  return router;
};

export { sellerRoutes };
