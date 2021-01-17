import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@app/_services';
import { AccountService } from '@app/_services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: any;
  public readMode = true;
  public submitted = false;
  public profileForm: FormGroup;
  public loading = false;

  constructor(private accountService: AccountService,
              private formBuilder: FormBuilder,
              private alertService: AlertService) {
    
   }

  ngOnInit(): void {
    this.user = this.accountService.userValue;
    this.profileForm = this.formBuilder.group({
      username: [this.user.username, Validators.required],
      firstname: [this.user.firstName, Validators.required],
      lastname: [this.user.lastName, Validators.required],
      password: ['']
    });
  }

  get f() { return this.profileForm.controls; }

  modifyProfile() {
    this.readMode = false;
  }

  onSave() {
    this.loading = true;
    this.alertService.clear();
    if (this.profileForm.controls['password'].value.length === 0) {
      this.accountService
        .update(this.user.id, {
          username: this.profileForm.controls['username'].value,
          firstName: this.profileForm.controls['firstname'].value,
          lastName: this.profileForm.controls['lastname'].value,
        })
        .subscribe((data) => {
          this.loading = false;
          if(data) {
            this.alertService.info(`updated successfully...`);
          }
        });
    }
    else {
      this.accountService
        .update(this.user.id, {
          username: this.profileForm.controls['username'].value,
          firstName: this.profileForm.controls['firstname'].value,
          lastName: this.profileForm.controls['lastname'].value,
          password: this.profileForm.controls['password'].value
        })
        .subscribe((data) => {
          this.loading = false;
          if(data) {
            this.alertService.info(`updated successfully...`);
          }

        });
    }
  }
}
