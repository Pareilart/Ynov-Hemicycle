import { RoleEnum } from '../../../enum/RoleEnum';
const { body } = require('express-validator');

export const createUserValidator = [
    body('email')
        .isEmail()
        .withMessage('L\'email doit être une adresse email valide')
        .notEmpty()
        .withMessage('L\'email est requis'),
    
    body('firstName')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Le prénom est requis')
        .isLength({ min: 2, max: 50 })
        .withMessage('Le prénom doit contenir entre 2 et 50 caractères'),
    
    body('lastName')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Le nom est requis')
        .isLength({ min: 2, max: 50 })
        .withMessage('Le nom doit contenir entre 2 et 50 caractères'),
    
    body('birthday')
        .optional()
        .isISO8601()
        .withMessage('La date de naissance doit être une date valide (YYYY-MM-DD)')
        .custom((value: string) => {
            try {
                const date = new Date(value);
                const now = new Date();
                if (isNaN(date.getTime())) {
                    throw new Error('Format de date invalide. Utilisez le format YYYY-MM-DD (exemple: 2000-12-31)');
                }
                if (date > now) {
                    throw new Error('La date de naissance ne peut pas être dans le futur');
                }
                return true;
            } catch (error) {
                throw new Error('Format de date invalide. Utilisez le format YYYY-MM-DD (exemple: 2000-12-31)');
            }
        }),

    body('password')
        .isString()
        .notEmpty()
        .withMessage('Le mot de passe est requis')
        .isLength({ min: 8 })
        .withMessage('Le mot de passe doit contenir au moins 8 caractères')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'),
    
    body('role')
        .isString()
        .notEmpty()
        .withMessage('Le rôle est requis')
        .isIn(Object.values(RoleEnum))
        .withMessage(`Le rôle doit être ${Object.values(RoleEnum).join(', ')}`)
];

export const updateUserValidator = [
    body('email')
        .optional()
        .isEmail()
        .withMessage('L\'email doit être une adresse email valide'),
    
    body('firstName')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Le prénom ne peut pas être vide')
        .isLength({ min: 2, max: 50 })
        .withMessage('Le prénom doit contenir entre 2 et 50 caractères'),
    
    body('lastName')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Le nom ne peut pas être vide')
        .isLength({ min: 2, max: 50 })
        .withMessage('Le nom doit contenir entre 2 et 50 caractères'),
    
    body('birthday')
        .optional()
        .isISO8601()
        .withMessage('La date de naissance doit être une date valide (YYYY-MM-DD)')
        .custom((value: string) => {
            try {
                const date = new Date(value);
                const now = new Date();
                if (isNaN(date.getTime())) {
                    throw new Error('Format de date invalide. Utilisez le format YYYY-MM-DD (exemple: 2000-12-31)');
                }
                if (date > now) {
                    throw new Error('La date de naissance ne peut pas être dans le futur');
                }
                return true;
            } catch (error) {
                throw new Error('Format de date invalide. Utilisez le format YYYY-MM-DD (exemple: 2000-12-31)');
            }
        }),

    body('password')
        .optional()
        .isString()
        .isLength({ min: 8 })
        .withMessage('Le mot de passe doit contenir au moins 8 caractères')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'),
];