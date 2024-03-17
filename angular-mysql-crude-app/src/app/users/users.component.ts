import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { UsersService } from '../shared/users.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
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
  pageTitle = 'User';
  ngOnInit() {
    this.userService.getAll().subscribe((response: any) => {
      this.users = response.data;
    });
  }

  editUser(id: number) {
    const res = this.users.find((obj) => obj.id === id);
    console.log(res);
    this.userForm.patchValue(res);
  }
  deleteUser(id: number) {}
}
