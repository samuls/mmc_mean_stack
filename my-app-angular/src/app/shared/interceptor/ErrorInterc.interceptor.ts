import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";


@Injectable()
export class ErrorInterc implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log("Reuqested URL: " + req.url);
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) =>{
                if(error instanceof HttpErrorResponse) {
                    console.log("ERROR=> "+error.message);
                    return throwError(error);
                }else {
                    console.log("ERROR=> "+error);
                    return throwError(error);
                }
            })
        );
    }
}