import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teams, TrailBlazer } from './trailblazer';

@Injectable({
  providedIn: 'root'
})
export class TrailblazerService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTrailBlazersWithUsername(userName: string): Observable<TrailBlazer[]> {
    const params = new HttpParams().set('username', userName);
    return this.http.get<TrailBlazer[]>(`${this.apiUrl}/characters/userName`, { params });
  }

  getTrailBlazers(id: Number, userName: string): Observable<TrailBlazer[]> {
    const body = {
      uid: id,
      username: userName
    };
    return this.http.post<TrailBlazer[]>(`${this.apiUrl}/characters/uid`, body);
  }

  removeTrailBlazer(id: string, userName: string): Observable<void> {
    console.log(`Removing Trailblazer with ID: ${id} and Username: ${userName}`);
    return this.http.delete<void>(`${this.apiUrl}/characters/${id}/${userName}`);
  }

  getTeams(userName: string) {
    const params = new HttpParams().set('username', userName);
    return this.http.get<Teams[]>(`${this.apiUrl}/team/userName`, { params });
  }
}