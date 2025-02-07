import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrailBlazer } from './trailblazer';

@Injectable({
  providedIn: 'root'
})
export class TrailblazerService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  //getAllTrailBlazers(userName: string): Observable<TrailBlazer[]> {
  //  const body = { username: userName };
  //  return this.http.get<TrailBlazer[]>(`${this.apiUrl}/characters/userName`, body);
  //}

  getTrailBlazers(id: string, userName: string): Observable<TrailBlazer[]> {
    const params = {
      uid: id,
      username: userName
    };
    return this.http.get<TrailBlazer[]>(`${this.apiUrl}/characters/uid`, { params });
  }

  deleteTrailBlazer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/characters/${id}`);
  }
}