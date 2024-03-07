import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private _http: HttpClient) {}

  public getAll(): Observable<any> {
    const URL = 'https://jsonplaceholder.typicode.com/comments';
    return this._http.get(URL);
  }
}
