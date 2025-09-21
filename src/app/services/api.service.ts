import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080';  // ✅ corregido

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  get<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }

    const url = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    console.log(`🔄 GET Request: ${this.baseUrl}/${url}`, params);

    return this.http.get<T>(`${this.baseUrl}/${url}`, {
      headers: this.getHeaders(),
      params: httpParams
    }).pipe(
      tap(response => console.log(`✅ GET ${url} Success:`, response)),
      catchError(error => {
        console.error(`❌ GET ${url} Error:`, error);
        return throwError(() => error);
      })
    );
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    console.log(`🔄 POST Request: ${this.baseUrl}/${endpoint}`, data);
    
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, {
      headers: this.getHeaders()
    }).pipe(
      tap(response => {
        console.log(`✅ POST ${endpoint} Success:`, response);
      }),
      catchError(error => {
        console.error(`❌ POST ${endpoint} Error:`, error);
        console.error('Error details:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          message: error.message,
          body: error.error
        });
        return throwError(() => error);
      })
    );
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    console.log(`🔄 PUT Request: ${this.baseUrl}/${endpoint}`, data);
    
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data, {
      headers: this.getHeaders()
    }).pipe(
      tap(response => {
        console.log(`✅ PUT ${endpoint} Success:`, response);
      }),
      catchError(error => {
        console.error(`❌ PUT ${endpoint} Error:`, error);
        return throwError(() => error);
      })
    );
  }

  delete<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }

    console.log(`🔄 DELETE Request: ${this.baseUrl}/${endpoint}`, params);

    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getHeaders(),
      params: httpParams
    }).pipe(
      tap(response => {
        console.log(`✅ DELETE ${endpoint} Success:`, response);
      }),
      catchError(error => {
        console.error(`❌ DELETE ${endpoint} Error:`, error);
        return throwError(() => error);
      })
    );
  }
}