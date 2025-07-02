import axios, { AxiosError } from 'axios';
import logger from '../../utils/logger';

export abstract class BaseService {
  private static readonly CONSTANTS = {
    MAX_RETRIES: 3,
    INITIAL_RETRY_DELAY: 5000, // 5 secondes
    RADIX: 10,
  } as const;

  private static sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  protected static async retryableRequest(url: string, attempt = 1): Promise<Buffer> {
    try {
      const response = await axios({
        method: 'GET',
        url,
        responseType: 'arraybuffer',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; HemicycleBot/1.0; +https://hemicycle.fr)',
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 429) {
        if (attempt >= this.CONSTANTS.MAX_RETRIES) {
          logger.error(`Nombre maximum de tentatives atteint (${this.CONSTANTS.MAX_RETRIES}) pour l'URL: ${url}`);
          throw error;
        }

        const delay = this.CONSTANTS.INITIAL_RETRY_DELAY * attempt;
        logger.warn(`Rate limit atteint (429). Attente de ${delay / 1000} secondes avant la prochaine tentative...`);
        await this.sleep(delay);
        return this.retryableRequest(url, attempt + 1);
      }
      throw error;
    }
  }

  protected static handleXmlNullValue(value: any): string | null {
    if (typeof value === 'object' && value !== null && '@xsi:nil' in value) {
      return null;
    }
    return value;
  }

  protected static getRadix(): number {
    return this.CONSTANTS.RADIX;
  }
}
