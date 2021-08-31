import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.page.html',
  styleUrls: ['./private.page.scss'],
})
export class PrivatePage implements OnInit {
  constructor(private authservice: AuthService) {}

  ngOnInit() {}
  renew() {
    this.authservice.rewToken().subscribe((resp) => {
      console.log(resp);
    });
  }
}
