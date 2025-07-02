import { Component, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '@core/stores/auth/auth.state';
import { selectAuthCurrentUser } from '@core/stores/auth/auth.selectors';
import { User} from '@core/models/user/user.model'
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profil-user',
  imports: [MessageModule, CommonModule, CheckboxModule, FormsModule],
  templateUrl: './profil-user.component.html',
  styleUrl: './profil-user.component.css'
})
export class ProfilUserComponent {
  twoFactorEnabled: boolean = false;
  private readonly store: Store<AuthState> = inject<Store<AuthState>>(Store<AuthState>);
  public readonly user: Signal<User | null> = this.store.selectSignal<User | null>(selectAuthCurrentUser);
}
