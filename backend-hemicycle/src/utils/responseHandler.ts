import { Response } from 'express';

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: Error | Record<string, unknown>;
}

export class ResponseHandler {
  static success<T>(res: Response, data?: T, message: string = 'Opération réussie', statusCode: number = 200): void {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
    };
    res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    message: string = 'Une erreur est survenue',
    error?: Error | Record<string, unknown>,
    statusCode: number = 500,
  ): void {
    const response: ApiResponse = {
      success: false,
      message,
      error,
    };
    res.status(statusCode).json(response);
  }

  static badRequest(
    res: Response,
    message: string = 'Requête invalide',
    error?: Error | Record<string, unknown>,
  ): void {
    this.error(res, message, error, 400);
  }

  static unauthorized(
    res: Response,
    message: string = 'Non autorisé',
    error?: Error | Record<string, unknown>,
  ): void {
    this.error(res, message, error, 401);
  }

  static forbidden(
    res: Response,
    message: string = 'Accès interdit',
    error?: Error | Record<string, unknown>,
  ): void {
    this.error(res, message, error, 403);
  }

  static notFound(
    res: Response,
    message: string = 'Ressource non trouvée',
    error?: Error | Record<string, unknown>,
  ): void {
    this.error(res, message, error, 404);
  }
}
