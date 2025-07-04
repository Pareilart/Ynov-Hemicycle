import { Environment } from "@core/models/environment/environment.model";

/**
 * Environnement de pré-production
 * @const environment
 *
 * @description
 * Configuration de l'environnement de pré-production
 *
 * @memberof Environment
 * @since 1.0.0
 *
 * @type {Environment} environment
 */
export const environment: Environment = {
  production: false,
  application: {
    name: "Hemicycle",
    version: "1.0.0",
    authors: [
      {
        name: "Valentin FORTIN",
        email: "valentin.fortin@ynov.com",
        role: "Developer"
      },
      {
        name: "Julie ALBINI",
        email: "julie.albini@ynov.com",
        role: "Developer"
      }
    ]
  },
  maintenance: {
    enabled: false,
    message: "Maintenance en cours"
  },
  storage: {
    prefix: "hemicycle",
    separator: "|",
    caseSensitive: true
  },
  apis: {
    main: {
      name: "Main",
      version: "1.0.0",
      url: "http://localhost:5001/api"
    }
  }
};
