import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {
  private apiUrl = 'http://localhost:8085'; // Asegúrate de usar http o https aquí

  constructor(private http: HttpClient) { }

  obtenerUsuario(nombreUsuario: string, password: string): Observable<any> {
    const requestBody = { nombreUsuario, password };

    return this.http.post<any>(`${this.apiUrl}/usuarios/obtenerUsuario`, requestBody);
  }
}
