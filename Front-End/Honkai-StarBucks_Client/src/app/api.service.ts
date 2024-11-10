import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getLoginData(username: string, password: string): Observable<any> {
    const body = {
        username: username,
        password: password
    };
    return this.http.post(`${this.baseUrl}/login`, body);
  }

  getRegisterData(username: string, password: string): Observable<any> {
    const body = {
        username: username,
        password: password
    };
    return this.http.post(`${this.baseUrl}/login/register`, body);
  }

}