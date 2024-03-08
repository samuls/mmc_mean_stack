import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private us: UserService) {
    this.createFormControl();
    this.createForm();
  }
  users: any[] = [];
  myForm: FormGroup;
  lname: FormControl;
  fname: FormControl;
  email: FormControl;
  password: FormControl;
  accountType: FormControl;
  address: FormControl;

  createFormControl() {
    this.lname = new FormControl('', Validators.required);
    this.fname = new FormControl('', Validators.required);
    this.address = new FormControl('', Validators.required);
    this.email = new FormControl('');
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);
    this.accountType = new FormControl('', [Validators.required]);
  }

  createForm() {
    this.myForm = new FormGroup({
      lname: this.lname,
      fname: this.fname,
      email: this.email,
      password: this.password,
      address: this.address,
      accountType: this.accountType,
    });
  }

  emailDomainValidator(control: FormControl) {
    let email = control.value;
    if (email && email.indexOf('@') > -1) {
      let domain = email.split('@')[1];
      if (domain != 'mmc.com') {
        return {
          emailDomain: {
            myDomain: domain,
          },
        };
      }
    }
    return null;
  }
  addUser() {
    this.us.addUserToDb(this.myForm.value);
  }

  loadUserDetails() {
    this.us.loadUsersFromDb().subscribe((res) => {
      const myArray = [];
      for (let key in res) {
        myArray.push(res[key]);
      }
      this.users = myArray;
    });
    console.log(this.users);
  }
}
