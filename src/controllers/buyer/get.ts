import { IBuyerDocument } from '@quysterben/jobber-shared';
import { getBuyerByEmail, getBuyerByUsername } from '@users/services/buyer.service';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const email = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const buyer: IBuyerDocument | null = await getBuyerByEmail(req.currentUser!.email);
    res.status(StatusCodes.OK).json({
      message: 'Buyer profile',
      buyer
    });
  } catch (error) {
    next(error);
  }
};

const currentUsername = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const buyer: IBuyerDocument | null = await getBuyerByUsername(req.currentUser!.email);
    res.status(StatusCodes.OK).json({
      message: 'Buyer profile',
      buyer
    });
  } catch (error) {
    next(error);
  }
};

const username = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const buyer: IBuyerDocument | null = await getBuyerByUsername(req.params.username);
    res.status(StatusCodes.OK).json({
      message: 'Buyer profile',
      buyer
    });
  } catch (error) {
    next(error);
  }
};

export { email, currentUsername, username };
