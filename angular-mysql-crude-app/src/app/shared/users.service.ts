import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/users');
  }

  addNew(user: User): Observable<User[]> {
    return this.http.post<User[]>(this.baseUrl + '/users/register', user);
  }

  edit(id: number): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/users/edit/' + id);
  }
}
