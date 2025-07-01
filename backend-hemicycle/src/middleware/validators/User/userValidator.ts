const { body } = require("express-validator");

export const createUserValidator = [
  body("email")
    .isEmail()
    .withMessage("L'email doit être une adresse email valide")
    .normalizeEmail(),

  body("firstName")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Le prénom ne peut pas être vide")
    .isLength({ min: 2, max: 50 })
    .withMessage("Le prénom doit contenir entre 2 et 50 caractères"),

  body("lastName")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Le nom ne peut pas être vide")
    .isLength({ min: 2, max: 50 })
    .withMessage("Le nom doit contenir entre 2 et 50 caractères"),

  body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit contenir au moins 8 caractères")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage(
      "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
    ),

  body("sexe")
    .isIn(["Homme", "Femme", "Autre"])
    .withMessage("Le sexe doit être Homme, Femme ou Autre"),

  body("birthday")
    .isISO8601()
    .toDate()
    .withMessage("La date de naissance doit être une date valide (YYYY-MM-DD)")
    .custom((value: string) => {
      try {
        const date = new Date(value);
        const now = new Date();
        if (isNaN(date.getTime())) {
          throw new Error(
            "Format de date invalide. Utilisez le format YYYY-MM-DD (exemple: 2000-12-31)"
          );
        }
        if (date > now) {
          throw new Error(
            "La date de naissance ne peut pas être dans le futur"
          );
        }
        return true;
      } catch (error) {
        throw new Error(
          "Format de date invalide. Utilisez le format YYYY-MM-DD (exemple: 2000-12-31)"
        );
      }
    }),
];

export const updateProfileValidator = [
  body("email")
    .optional()
    .isEmail()
    .withMessage("L'email doit être une adresse email valide"),

  body("firstName")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Le prénom ne peut pas être vide")
    .isLength({ min: 2, max: 50 })
    .withMessage("Le prénom doit contenir entre 2 et 50 caractères"),

  body("lastName")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Le nom ne peut pas être vide")
    .isLength({ min: 2, max: 50 })
    .withMessage("Le nom doit contenir entre 2 et 50 caractères"),

  body("password")
    .optional()
    .isString()
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit contenir au moins 8 caractères")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage(
      "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
    ),

  body("sexe")
    .optional()
    .isIn(["Homme", "Femme", "Autre"])
    .withMessage("Le sexe doit être Homme, Femme ou Autre"),

  body("birthday")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("La date de naissance doit être une date valide (YYYY-MM-DD)")
    .custom((value: string) => {
      try {
        const date = new Date(value);
        const now = new Date();
        if (isNaN(date.getTime())) {
          throw new Error(
            "Format de date invalide. Utilisez le format YYYY-MM-DD (exemple: 2000-12-31)"
          );
        }
        if (date > now) {
          throw new Error(
            "La date de naissance ne peut pas être dans le futur"
          );
        }
        return true;
      } catch (error) {
        throw new Error(
          "Format de date invalide. Utilisez le format YYYY-MM-DD (exemple: 2000-12-31)"
        );
      }
    }),
];

interface ExportDataProfile {
  profile: boolean;
  lawReaction: boolean;
  exportFormat: string;
}

export const exportDataProfileValidator = [
  body("exportFormat")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Le format d'export ne peut pas être vide")
    .isIn(["CSV", "JSON"])
    .withMessage("Le format d'export doit être CSV, JSON ou XML"),

  body("profile")
    .isBoolean()
    .withMessage("Le champ profile doit être un booléen"),

  body("lawReaction")
    .isBoolean()
    .withMessage("Le champ lawReaction doit être un booléen"),

  body()
    .custom((value: ExportDataProfile) => {
      if (!value.profile && !value.lawReaction) {
        throw new Error("Au moins un type de données doit être sélectionné pour l'export");
      }
      return true;
    })
];
