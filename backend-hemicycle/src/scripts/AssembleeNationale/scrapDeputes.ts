import dotenv from 'dotenv';
import { DeputesService } from '../../services/AssembleeNationale/DeputesService';
import logger from '../../utils/logger';
import mongoose from 'mongoose';

// Charger les variables d'environnement
dotenv.config();

const scrapDeputes = async () => {
  try {
    // Se connecter à MongoDB si ce n'est pas déjà fait
    if (mongoose.connection.readyState !== 1) {
      const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/hemicycle';
      logger.info('Tentative de connexion à MongoDB...');
      await mongoose.connect(mongoUri);
      logger.info('Connecté à MongoDB avec succès');
    }

    logger.info('Début du scraping des députés...');

    // Lancer la mise à jour des députés
    await DeputesService.updateDeputes();

    // Fermer la connexion MongoDB si on est en mode standalone
    if (require.main === module) {
      await mongoose.connection.close();
      logger.info('Connexion MongoDB fermée');
      process.exit(0);
    }
  } catch (error) {
    logger.error('Erreur lors du scraping des députés:', error);
    // Fermer la connexion MongoDB si on est en mode standalone
    if (require.main === module && mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      logger.info('Connexion MongoDB fermée après erreur');
      process.exit(1);
    }
    throw error;
  }
};

// Exécuter le script si lancé directement
if (require.main === module) {
  scrapDeputes();
}

export default scrapDeputes;
