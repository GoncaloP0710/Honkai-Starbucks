import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrailBlazer } from './trailblazer';

@Injectable({
  providedIn: 'root'
})
export class TrailblazerService {
  private apiUrl = 'http://localhost:3000/'; // TODO replace with the correct API URL

  constructor(private http: HttpClient) {}

  getTrailBlazers(): Observable<TrailBlazer[]> {
    return this.http.get<TrailBlazer[]>(this.apiUrl);
  }

  getTrailBlazer(id: string): Observable<TrailBlazer> {
    return this.http.get<TrailBlazer>(`${this.apiUrl}/${id}`);
  }

  updateTrailBlazer(id: string, trailblazer: TrailBlazer): Observable<TrailBlazer> {
    return this.http.put<TrailBlazer>(`${this.apiUrl}/${id}`, trailblazer);
  }

  deleteTrailBlazer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}