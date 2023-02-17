import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';


/**
 * HttpInterceptor has intercept() method to inspect and
 * transform HTTP requests before they are sent to server.
 */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    req = req.clone({
      withCredentials: true,
    });

    return next.handle(req);
  }


}



export const httpInterceptorProviders =
[
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
