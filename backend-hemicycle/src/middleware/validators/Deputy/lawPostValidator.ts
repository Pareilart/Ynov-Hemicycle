import { LawReactionType, LawReactionEmoji } from '../../../enum/LawReactionTypeEnum';

const { body } = require('express-validator');

export const createLawPostValidator = [
  body('title')
    .isString()
    .notEmpty()
    .withMessage('Le titre est requis')
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage('Le titre doit contenir entre 3 et 255 caractères'),

  body('articleConstitutionnel')
    .isInt({ min: 1 })
    .notEmpty()
    .withMessage('L\'article constitutionnel est requis et doit être un nombre positif'),

  body('voteType')
    .isString()
    .notEmpty()
    .withMessage('Le type de vote est requis'),

  body('dateProposition')
    .isISO8601()
    .toDate()
    .notEmpty()
    .withMessage('La date de proposition est requise et doit être une date valide'),

  body('dateAdoption')
    .isISO8601()
    .toDate()
    .notEmpty()
    .withMessage('La date d\'adoption est requise et doit être une date valide'),

  body('legislature')
    .isInt({ min: 1 })
    .notEmpty()
    .withMessage('La législature est requise et doit être un nombre positif'),
];
