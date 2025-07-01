import { jest } from '@jest/globals';

// Global setup for tests
beforeAll(() => {
  // Setting up environment variables for tests
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-jwt-secret';
  process.env.MONGODB_URI = 'mongodb://localhost:27017/hemicycle-test';
});

beforeEach(() => {
  // Clear mocks before each test
  jest.clearAllMocks();
});

afterAll(() => {
  // Cleanup after all tests
  jest.resetAllMocks();
});

// Global mock for console.log in test mode (optional)
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
