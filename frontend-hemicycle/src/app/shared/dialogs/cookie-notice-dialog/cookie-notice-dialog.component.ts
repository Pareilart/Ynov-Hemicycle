import { Component } from '@angular/core';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

/**
 * Type CookieNoticeDialogData
 * @type CookieNoticeDialogData
 *
 * @description
 * Type représentant les données du dialogue
 * de la bannière de cookies
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type CookieNoticeDialogData = {};

@Component({
  selector: 'app-cookie-notice-dialog',
  imports: [DynamicDialogModule],
  template: ``,
})
export class CookieNoticeDialogComponent {};
