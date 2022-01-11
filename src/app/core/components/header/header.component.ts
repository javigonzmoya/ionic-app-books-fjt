import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titleHeader = '';
  isLogged = false;
  user: User | null = null;
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.store.select('auth').subscribe((auth) => {
      this.isLogged = !!auth.user;
      this.user = auth.user;
    });
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/public']);
  }
}
