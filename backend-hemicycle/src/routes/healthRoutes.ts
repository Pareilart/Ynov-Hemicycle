import { Router, Request, Response } from 'express';
import { ResponseHandler } from '../utils/responseHandler';

const router = Router();

interface HealthResponse {
  message: string;
  status: string;
  timestamp: Date;
  version: string;
}

/**
 * Basic health/test route
 * GET /api/health
 */
router.get('/', (req: Request, res: Response) => {
  const healthData: HealthResponse = {
    message: 'Hello World',
    status: 'OK',
    timestamp: new Date(),
    version: '1.0.0',
  };

  ResponseHandler.success(res, healthData, 'Service online');
});

export default router;
