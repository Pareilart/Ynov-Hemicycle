import request from 'supertest';
import express from 'express';
import cors from 'cors';
import healthRoutes from '../../routes/healthRoutes';

// Create Express application for testing
const createTestApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api/health', healthRoutes);
  return app;
};

describe('Health Route', () => {
  let app: express.Application;

  beforeAll(() => {
    app = createTestApp();
  });

  describe('GET /api/health', () => {
    test('should return hello world message with success response', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Service online');
      expect(response.body.data).toHaveProperty('message', 'Hello World');
      expect(response.body.data).toHaveProperty('status', 'OK');
      expect(response.body.data).toHaveProperty('version', '1.0.0');
      expect(response.body.data).toHaveProperty('timestamp');

      // Verify that timestamp is a valid date
      const timestamp = new Date(response.body.data.timestamp);
      expect(timestamp).toBeInstanceOf(Date);
      expect(timestamp.getTime()).not.toBeNaN();
    });

    test('should have correct response structure', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      // Verify response structure
      expect(response.body).toMatchObject({
        success: expect.any(Boolean),
        message: expect.any(String),
        data: {
          message: expect.any(String),
          status: expect.any(String),
          timestamp: expect.any(String),
          version: expect.any(String),
        },
      });
    });

    test('should return content-type json', async () => {
      await request(app)
        .get('/api/health')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
});
