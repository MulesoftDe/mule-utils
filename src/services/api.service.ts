// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {config, Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient,private config:ConfigService) {}

  get<T>(endpoint: string): Observable<T> {
    const url = `${this.config.getApiUrl()}${endpoint}`;
    return this.http.get<T>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<T>('get'))
      );
  }

  delete<T>(endpoint: string): Observable<T> {
    const url = `/api/${endpoint}`;
    return this.http.delete<T>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<T>('delete'))
      );
  }

  patch<T>(endpoint: string, data: Partial<T>): Observable<T> {
    const url = `/api/${endpoint}`;
    return this.http.patch<T>(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<T>('patch'))
      );
  }

  post<T>(endpoint: string, data: T): Observable<T> {
    const url = `/api/${endpoint}`;
    return this.http.post<T>(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<T>('post'))
      );
  }

  put<T>(endpoint: string, data: T): Observable<T> {
    const url = `/api/${endpoint}`;
    return this.http.put<T>(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<T>('put'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
