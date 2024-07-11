import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const health = (_req: Request, res: Response): void => {
  res.status(StatusCodes.OK).send('Users service is up and running!');
};
