// config.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../environments/environment';

export interface AppConfig {
  url: string;
  clientId: string;
  clientSecret: string;
  tokenUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _config!: AppConfig;

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<AppConfig> {
    return this.http.get<AppConfig>(`/assets/${environment.configFile}`).pipe(
      map((config: AppConfig) => {
        this._config = config;
        return config;
      })
    );
  }

  getConfig(): AppConfig {
    return this._config;
  }

  getApiUrl(): string {
    return this._config ? this._config.url : '';
  }

  getClientId(): string {
    return this._config ? this._config.clientId : '';
  }

  getClientSecret(): string {
    return this._config ? this._config.clientSecret : '';
  }

  getTokenUrl(): string {
    return this._config ? this._config.tokenUrl : '';
  }

  setConfig(value: AppConfig): void {
    this._config = value;
  }

  isDevelopment(): boolean {
    return !environment.production;
  }
}
