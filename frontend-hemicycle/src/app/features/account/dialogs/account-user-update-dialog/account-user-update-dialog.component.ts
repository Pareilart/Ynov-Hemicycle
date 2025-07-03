import { Component } from '@angular/core';
import { User } from '@app/core/models/user/user.model';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

/**
 * Type AccountUserUpdateDialogData
 * @type AccountUserUpdateDialogData
 *
 * @description
 * Type représentant les données du dialogue
 * de mise à jour de l'utilisateur
 *
 * @version 1.0.0
 *
 * @property {User} account - L'utilisateur à mettre à jour
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type AccountUserUpdateDialogData = {
  account: User
}

@Component({
  selector: 'app-account-user-update-dialog',
  imports: [DynamicDialogModule],
  template: ``,
})
export class AccountUserUpdateDialogComponent {}
