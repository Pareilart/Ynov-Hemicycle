import cron from 'node-cron';
import scrapScrutins from '../../scripts/AssembleeNationale/scrapScrutins';
import logger from '../../utils/logger';

/**
 * Planifie l'exécution du scraping des scrutins tous les jours à minuit
 */
export const scheduleScrutinsScraping = (): void => {
  // Exécuter tous les jours à minuit (00:00)
  cron.schedule('0 0 * * *', async () => {
    logger.info('Démarrage de la tâche cron de scraping des scrutins');
    try {
      await scrapScrutins();
      logger.info('Tâche cron de scraping des scrutins terminée avec succès');
    } catch (error) {
      logger.error('Erreur lors de l\'exécution de la tâche cron de scraping des scrutins:', error);
    }
  });

  logger.info('Tâche cron de scraping des scrutins planifiée avec succès');
};
