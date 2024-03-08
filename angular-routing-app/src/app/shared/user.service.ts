import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  loadUsers(): string[] {
    return ['admin', 'manager', 'QA'];
  }

  constructor(private http: HttpClient) {}

  addUserToDb(users: any) {
    this.http
      .post('http://localhost:3000/users/register', users)
      .subscribe((response) => {
        console.log(response);
      });
  }

  loadUsersFromDb() {
    return this.http.get('http://localhost:3000/users');
  }
}
