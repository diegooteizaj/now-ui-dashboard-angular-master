import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiMedicionService {

  private apiUrl = 'http://localhost:8085/medicion';
  constructor(
    private http : HttpClient,
  ) { }

  getMedicionByIdDucto(id:number):Observable<any>{
    return this.http.get(this.apiUrl+`/getMedicionByIdDucto/${id}`);
  }

  getMedicion(body:any):Observable<any>{
    return this.http.post(this.apiUrl+'/getMedicion',body);
  }
}
