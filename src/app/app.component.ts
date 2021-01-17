import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
  user: User;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
    this.accountService.getAll().subscribe();
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.accountService.logout();
  }
}
