import { ISellerDocument } from '@quysterben/jobber-shared';
import { getRandomSellers, getSellerById, getSellerByUsername } from '@users/services/seller.service';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const id = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const seller: ISellerDocument | null = await getSellerById(req.params.sellerId);
    res.status(StatusCodes.OK).json({ message: 'Seller profile.', seller });
  } catch (error) {
    next(error);
  }
};

const username = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const seller: ISellerDocument | null = await getSellerByUsername(req.params.username);
    res.status(StatusCodes.OK).json({ message: 'Seller profile.', seller });
  } catch (error) {
    next(error);
  }
};

const random = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const sellers: ISellerDocument[] = await getRandomSellers(parseInt(req.params.size, 10));
    res.status(StatusCodes.OK).json({ message: 'Random sellers.', sellers });
  } catch (error) {
    next(error);
  }
};

export { id, username, random };
