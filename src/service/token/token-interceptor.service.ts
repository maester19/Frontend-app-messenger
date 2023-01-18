import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../data/user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private auth: AuthService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    ///
    let token = this.auth.getAuth()

    let jwttoken = req.clone({
      setHeaders: {
        Authorization: 'afoup ' + token.token
      }
    })
    return next.handle(jwttoken)
  }
}
