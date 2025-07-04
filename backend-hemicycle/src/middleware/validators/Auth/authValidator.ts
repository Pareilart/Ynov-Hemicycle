const { body } = require('express-validator');

export const registerValidator = [
  body('email')
    .isEmail()
    .withMessage('L\'email doit être une adresse email valide')
    .normalizeEmail(),

  body('firstname')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Le prénom ne peut pas être vide')
    .isLength({ min: 2, max: 50 })
    .withMessage('Le prénom doit contenir entre 2 et 50 caractères'),

  body('lastname')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Le nom ne peut pas être vide')
    .isLength({ min: 2, max: 50 })
    .withMessage('Le nom doit contenir entre 2 et 50 caractères'),

  body('password')
    .isString()
    .isLength({ min: 8 })
    .withMessage('Le mot de passe doit contenir au moins 8 caractères')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage(
      'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial',
    ),

  body('sexe')
    .isIn(['Homme', 'Femme', 'Autre'])
    .withMessage('Le sexe doit être Homme, Femme ou Autre'),

  body('birthday')
    .isISO8601()
    .toDate()
    .withMessage('La date de naissance doit être une date valide (YYYY-MM-DD)')
    .custom((value: string) => {
      try {
        const date = new Date(value);
        const now = new Date();
        if (Number.isNaN(date.getTime())) {
          throw new Error(
            'Format de date invalide. Utilisez le format YYYY-MM-DD (exemple: 2000-12-31)',
          );
        }
        if (date > now) {
          throw new Error(
            'La date de naissance ne peut pas être dans le futur',
          );
        }
        return true;
      } catch (error) {
        throw new Error(
          'Format de date invalide. Utilisez le format YYYY-MM-DD (exemple: 2000-12-31)',
        );
      }
    }),

  body('twoFactorEnabled')
    .isBoolean()
    .optional()
    .withMessage('La 2FA doit être un booléen'),
];

export const loginValidator = [
  body('email')
    .isEmail()
    .withMessage('L\'email doit être une adresse email valide')
    .normalizeEmail(),

  body('password')
    .isString()
    .notEmpty()
    .withMessage('Le mot de passe ne peut pas être vide'),
];

export const refreshTokenValidator = [
  body('refreshToken')
    .isString()
    .notEmpty()
    .withMessage('Le refresh token est requis'),
];

export const verify2FACodeValidator = [
  body('code')
    .isString()
    .notEmpty()
    .withMessage('Le code est requis'),
  body('email')
    .isEmail()
    .notEmpty()
    .withMessage('L\'email est requis'),
];

export const verifyEmailValidator = [
  body('code')
    .isString()
    .notEmpty()
    .withMessage('Le code est requis'),
  body('email')
    .isEmail()
    .notEmpty()
    .withMessage('L\'email est requis'),
];

export const resendVerificationEmailValidator = [];
