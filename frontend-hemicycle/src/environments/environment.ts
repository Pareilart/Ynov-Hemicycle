import { Environment } from "@core/models/environment/environment.model";

/**
 * Environnement de développement
 * @const environment
 *
 * @description
 * Configuration de l'environnement de développement
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
        email: "contact@valentin-fortin.pro",
        role: "Developer"
      }
    ]
  },
  maintenance: {
    enabled: false,
    message: "Maintenance en cours"
  },
  storage: {
    prefix: "app",
    separator: "|",
    caseSensitive: true
  },
  apis: {
    main: {
      name: "Main",
      version: "1.0.0",
      url: "http://localhost:3000"
    }
  }
};
