import { LawReactionType, LawReactionEmoji } from '../../../enum/LawReactionTypeEnum';

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
