// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service"; ;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
console.log(authToken);
    // Ajouter les en-têtes spécifiques
    let headers = req.headers
      .set('Accept', 'application/json') 
    // console.log(headers,'headers')
    // Ajouter l'en-tête Authorization si le token est présent
    if (authToken) {
 headers = headers.set('Authorization', `Bearer ${authToken}`);
    }

    const cloned = req.clone({ headers });

    return next.handle(cloned);
  }
}
