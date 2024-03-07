import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from 'rxjs/operators'

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    private _cache: Map<string, { expireDate: Date; response: HttpResponse<any> }> = new Map()

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.method !== 'GET') {
            return next.handle(req)
        }
        const cachedResponse = this._cache.get(req.url)
        if (cachedResponse && cachedResponse.expireDate <= new Date()) {
            this._cache.delete(req.url)
            return this._sendRequest(req, next)
        }
        return cachedResponse ? of(cachedResponse.response) : this._sendRequest(req, next)

    }
    private _sendRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap((event) => {
                if (event instanceof HttpResponse) {
                    const expireDate = new Date(Date.now() + 10 * 1000);
                    this._cache.set(req.url, {
                        expireDate: expireDate,
                        response: event
                    })
                }
            })
        )
    }
}