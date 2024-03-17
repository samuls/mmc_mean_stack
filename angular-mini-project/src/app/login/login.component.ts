import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../shared/user.service';
import { catchError, map, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: Router
  ) {}

  loginUser: User[] = [];
  message_text_color = '';
  error_message = '';

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login() {
    this.userService
      .loginUser(this.loginForm.value)
      .pipe(
        map((res) => res),
        catchError((err: HttpErrorResponse) => {
          console.log('EVENT ERRPR', err.error.message);
          return throwError(err);
        })
      )
      .subscribe((response: any) => {
        if (response.status == true) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.message_text_color = 'text-success';
          this.error_message = 'You are logged in successfully';
          this.route.navigateByUrl('products');
        } else {
          this.message_text_color = 'text-danger';
          this.error_message = response.message;
        }
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      //console.error('An error occurred:', error.error);
      return error.error;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      // console.error(
      //   `Backend returned code ${error.status}, body was: `,
      //   error.error
      // );
      return error.error;
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
