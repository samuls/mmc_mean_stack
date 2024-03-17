import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  loginUser(user: User) {
    return this.http.post(this.baseUrl + 'api/users/login', user);
  }

  signupUser(user: User) {
    return this.http.post(this.baseUrl + 'api/users/signup', user);
  }
}
