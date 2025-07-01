import { Component, inject } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';

/**
 * Type CookiePreferenceDialogData
 * @type CookiePreferenceDialogData
 *
 * @description
 * Type représentant les données du
 * dialogue de préférence de cookies
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type CookiePreferenceDialogData = {};

@Component({
  selector: 'app-cookie-preference-dialog',
  imports: [DynamicDialogModule],
  template: ``,
})
export class CookiePreferenceDialogComponent {};
