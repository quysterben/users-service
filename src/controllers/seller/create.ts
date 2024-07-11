import { Request, Response, NextFunction } from 'express';
import { sellerSchema } from '@users/schemes/seller';
import { BadRequestError, ISellerDocument } from '@quysterben/jobber-shared';
import { createSeller, getSellerByEmail } from '@users/services/seller.service';
import { StatusCodes } from 'http-status-codes';

const seller = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { error } = await Promise.resolve(sellerSchema.validate(req.body));
    if (error?.details) {
      throw new BadRequestError(error.details[0].message, 'Create seller() method error.');
    }
    const checkIfSellerExist: ISellerDocument | null = await getSellerByEmail(req.body.email);
    if (checkIfSellerExist) {
      throw new BadRequestError('Seller already exists', 'Create seller() method error.');
    }
    const seller: ISellerDocument = {
      profilePublicId: req.body.profilePublicId,
      fullName: req.body.fullName,
      username: req.currentUser!.username,
      email: req.body.email,
      profilePicture: req.body.profilePicture,
      description: req.body.description,
      oneliner: req.body.oneliner,
      country: req.body.country,
      skills: req.body.skills,
      languages: req.body.languages,
      responseTime: req.body.responseTime,
      experience: req.body.experience,
      education: req.body.education,
      socialLinks: req.body.socialLinks,
      certificates: req.body.certificates
    };
    const createdSeller: ISellerDocument = await createSeller(seller);
    res.status(StatusCodes.CREATED).json({
      message: 'Seller created successfully.',
      seller: createdSeller
    });
  } catch (error) {
    next(error);
  }
};

export { seller };
