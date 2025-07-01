import { LawReactionType, LawReactionEmoji, LawPostReport } from '../../../enum/LawReactionTypeEnum';

const { body } = require('express-validator');

export const addLawReactionValidator = [
  body('reactionType')
    .isString()
    .notEmpty()
    .withMessage('Le type de réaction est requis')
    .isIn(Object.values(LawReactionType))
    .withMessage('Le type de réaction doit être soit APPROVE ou DISAPPROVE'),

  body('reactionEmoji')
    .optional()
    .isString()
    .isIn(Object.values(LawReactionEmoji))
    .withMessage('L\'emoji de réaction doit être soit INSTRUCTIVE, SUPPORT, LOVE ou BRAVO'),
];

export const reportLawPostValidator = [
  body('reason')
    .isString()
    .notEmpty()
    .withMessage('Le motif de signalement est requis')
    .isIn(Object.values(LawPostReport))
    .withMessage('Le motif de signalement doit être soit MISINFORMATION, IRRELEVANT ou UNCONSTRUCTIVE'),

  body('description')
    .optional()
    .isString()
    .withMessage('La description doit être une chaîne de caractères'),
];
