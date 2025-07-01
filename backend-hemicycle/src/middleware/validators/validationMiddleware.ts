import { Request, Response, NextFunction } from 'express';
import { ResponseHandler } from '../../utils/responseHandler';

const { validationResult } = require('express-validator');

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseHandler.badRequest(res, 'Erreur de validation', errors.array());
  }
  next();
};
