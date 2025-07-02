import { Component, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '@core/stores/auth/auth.state';
import { User } from '@core/models/user/user.model';
import { selectAuthCurrentUser } from '@core/stores/auth/auth.selectors';

@Component({
  selector: 'app-profil-depute',
  imports: [],
  templateUrl: './profil-depute.component.html',
  styleUrl: './profil-depute.component.css'
})
export class ProfilDeputeComponent {

  private readonly store: Store<AuthState> = inject<Store<AuthState>>(Store<AuthState>);
  public readonly user: Signal<User | null> = this.store.selectSignal<User | null>(selectAuthCurrentUser);
}
