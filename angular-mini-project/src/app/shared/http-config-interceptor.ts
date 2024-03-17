import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpConfigInterceptor implements HttpInterceptor {
  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('Event>>>', event);
        }

        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
          reason:
            error && error.error && error.error.reason
              ? error.error.reason
              : '',
          status: error.status,
        };
        return throwError(error);
      })
    );
  }
}
