import { Request, Response, NextFunction } from 'express';
const { validationResult } = require('express-validator');
import { ResponseHandler } from '../../utils/responseHandler';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return ResponseHandler.badRequest(res, "Erreur de validation", errors.array());
    }
    next();
}; 