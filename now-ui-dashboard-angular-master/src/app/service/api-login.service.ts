import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {
  private apiUrl = 'https://api.appultrasound.cl'; // Asegúrate de usar http o https aquí

  constructor(private http: HttpClient) { }

  obtenerUsuario(nombreUsuario: string, password: string): Observable<any> {
    const requestBody = { nombreUsuario, password };

    return this.http.post<any>(`${this.apiUrl}/usuarios/obtenerUsuario`, requestBody);
  }

  getUsuarios():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/usuarios/`);
  }

  insertUser(user:any):Observable<any>{
    return this.http.post(this.apiUrl+'/addUsuario',user);
  }
}