import express, { Router } from 'express';
import { seller as createSeller } from '@users/controllers/seller/create';
import { seller as updateSeller } from '@users/controllers/seller/update';
import { id, random, username } from '@users/controllers/seller/get';
import { seed } from '@users/controllers/seller/seed';

const router: Router = express.Router();

const sellerRoutes = (): Router => {
  router.post('/create', createSeller);
  router.put('/:sellerId', updateSeller);

  router.get('/id/:sellerId', id);
  router.get('/username/:username', username);
  router.get('/random/:size', random);
  router.put('/put/:count', seed);

  return router;
};

export { sellerRoutes };
