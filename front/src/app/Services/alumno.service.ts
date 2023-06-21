import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Alumno } from '../Interfaces/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private endPoint: string = environment.endPoint;
  private apiURL: string = `${this.endPoint}alumno`;

  constructor(private http: HttpClient) { }

  getAllAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiURL)
  }

  getAlumno(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiURL}/${id}`)
  }

  createAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiURL, alumno)
  }

  updateAlumno(id:number, alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.apiURL}/${id}`, alumno)
  }

  deleteAlumno(id: number): Observable<Alumno> {
    return this.http.delete<Alumno>(`${this.apiURL}/${id}`)
  }
}
