export class MaxAttemptsExceededError extends Error {
  constructor() {
    super('Le nombre maximum de tentatives a été dépassé. Veuillez générer un nouveau code.');
    this.name = 'MaxAttemptsExceededError';
  }
}
