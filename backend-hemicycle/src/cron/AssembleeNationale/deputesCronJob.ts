import cron from 'node-cron';
import scrapDeputes from '../../scripts/AssembleeNationale/scrapDeputes';
import logger from '../../utils/logger';

/**
 * Planifie l'exécution du scraping des députés tous les jours à minuit
 */
export const scheduleDeputesScraping = (): void => {
  // Exécuter tous les jours à minuit (00:00)
  cron.schedule('0 0 * * *', async () => {
    logger.info('Démarrage de la tâche cron de scraping des députés');
    try {
      await scrapDeputes();
      logger.info('Tâche cron de scraping des députés terminée avec succès');
    } catch (error) {
      logger.error('Erreur lors de l\'exécution de la tâche cron de scraping des députés:', error);
    }
  });

  logger.info('Tâche cron de scraping des députés planifiée avec succès');
};
