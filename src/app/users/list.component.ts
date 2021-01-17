
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  users = null;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    // filtered to show other users and not self.
    // this.accountService.users
    //   .pipe(first())
    //   .subscribe(users => this.users = users.filter(u => u.id !== this.accountService.userValue.id));

    this.users = this.accountService.usersValue.filter(u => u.id !== this.accountService.userValue.id);
  }

  deleteUser(id: string) {
    const user = this.users.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => {
        this.users = this.users.filter(x => x.id !== id);
      });
  }
}
