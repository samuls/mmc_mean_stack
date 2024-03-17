import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css'],
})
export class CreateuserComponent {
  userForm: FormGroup = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    address: new FormControl(''),
    accountType: new FormControl(''),
  });

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder
  ) {}

  users: User[] = [];

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      accountType: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  addUser() {
    this.userService.addNew(this.userForm.value).subscribe((response: any) => {
      this.users.push(response.data);
      this.userForm.reset();
    });
  }
}
