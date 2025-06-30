import { Provider, Type } from "@angular/core";
import { TitleStrategy as BaseTitleStrategy } from "@angular/router";

/**
 * Fournisseur provideTitleStrategy
 * @function provideTitleStrategy
 *
 * @description
 * Fournisseur de la stratégie TitleStrategy pour le titre de la page
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 *
 * @example
 * ```typescript
 * provideTitleStrategy(TitleStrategy)
 * ```
 *
 * @return {Provider} - Retourne un fournisseur de la stratégie TitleStrategy
 */
export function provideTitleStrategy(strategy: Type<BaseTitleStrategy>): Provider {
  return {
    provide: BaseTitleStrategy,
    useClass: strategy
  };
}
