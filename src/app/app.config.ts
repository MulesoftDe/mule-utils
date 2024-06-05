import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {AuthService} from "../services/auth.service";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {ConfigService} from "../services/config.service";
import {AuthInterceptor} from "../interceptor/auth.interceptor";
import {provideAnimations} from "@angular/platform-browser/animations";

export function initializeApp(configService: ConfigService, authService: AuthService) {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      configService.loadConfig().subscribe({
        next: (config) => {
          configService.setConfig(config);
          if (!configService.isDevelopment()) {
            authService.generateToken().subscribe({
              next: (response) => {
                const token = response.access_token;
                authService.setToken(token);
                console.log('Token generated and stored:', token);
                resolve(true);
              },
              error: (error) => {
                console.error('Error generating token:', error);
                reject(error);
              }
            });
          } else {
            console.log('Environnement de développement, génération de token non nécessaire.');
            resolve(true);
          }
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()), {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService, AuthService],
      multi: true
    },
    AuthService,
    ConfigService
  ]
};