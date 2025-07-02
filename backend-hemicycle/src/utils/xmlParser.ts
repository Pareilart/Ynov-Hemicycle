import { XMLParser } from 'fast-xml-parser';
import logger from './logger';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@',
  removeNSPrefix: true,
  parseAttributeValue: true,
});

export function parseXML<T>(xmlContent: string): T | null {
  try {
    const result = parser.parse(xmlContent);

    // Les données sont toujours dans la première clé de l'objet
    const rootKey = Object.keys(result)[0];
    return result[rootKey] as T;
  } catch (error) {
    logger.error('Erreur lors du parsing XML:', error);
    return null;
  }
}

export default {
  parseXML,
};
