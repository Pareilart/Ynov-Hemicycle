import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import { Express } from 'express';
import path from 'path';

const swaggerDocument = yaml.load(path.resolve(__dirname, '../../swagger.yaml'));

export function setupSwagger(app: Express) {
  app.use('/api/docs', swaggerUi.serve as any);
  app.get('/api/docs', swaggerUi.setup(swaggerDocument) as any);
}