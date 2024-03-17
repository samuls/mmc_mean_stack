import { Component } from '@angular/core';
import { User } from '../models/user.model';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupUser: User[] = [];
  signupForm: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(40),
        ],
      ],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: Router
  ) {}

  signup() {
    this.userService
      .signupUser(this.signupForm.value)
      .subscribe((response: any) => {
        if (response.status === true) {
          this.route.navigate(['/login']);
        } else {
          alert(response.message);
        }
      });
  }
}
