import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";


@Injectable()
export class HeaderInter implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log("Reuqested URL: " + req.url);
        const API_KEY ='APIKEY123';
        const ROLE_KEY ='ROLE';
        console.log('ABC');
        return next.handle(req.clone({setHeaders:{API_KEY, ROLE_KEY}}));
    }
}