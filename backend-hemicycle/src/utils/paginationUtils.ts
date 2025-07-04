import { Request } from 'express';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  defaultLimit?: number;
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export class PaginationUtils {
  /**
   * Extrait les paramètres de pagination de la requête
   * @param req La requête Express
   * @param options Options de pagination
   * @returns Les paramètres de pagination
   */
  static getPaginationParams(req: Request, options: PaginationOptions = {}): { page: number; limit: number; } {
    const defaultLimit = options.defaultLimit || 10;
    const page = Math.max(1, parseInt(req.query.page as string, 10) || options.page || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string, 10) || options.limit || defaultLimit);

    return { page, limit };
  }

  /**
   * Crée un résultat paginé
   * @param data Les données à paginer
   * @param total Le nombre total d'éléments
   * @param page La page actuelle
   * @param limit Le nombre d'éléments par page
   * @returns Le résultat paginé
   */
  static createPaginatedResult<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
  ): PaginationResult<T> {
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  /**
   * Calcule le nombre d'éléments à sauter pour la pagination
   * @param page La page actuelle
   * @param limit Le nombre d'éléments par page
   * @returns Le nombre d'éléments à sauter
   */
  static getSkipValue(page: number, limit: number): number {
    return (page - 1) * limit;
  }
}
