// auth.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.token = localStorage.getItem('authToken') || 'Random Value';
  }

  getToken(): string {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  clearToken(): void {
    this.token = '';
    localStorage.removeItem('authToken');
  }

  generateToken(): Observable<any> {
    const body = new URLSearchParams();
    const config = this.configService.getConfig();

    body.set('client_id', config.clientId);
    body.set('client_secret', config.clientSecret);
    body.set('grant_type', 'client_credentials');

    return this.http.post(config.tokenUrl, body.toString(), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
  }
}
