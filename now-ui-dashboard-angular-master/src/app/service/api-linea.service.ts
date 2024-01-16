import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiLineaService {

  private api = 'http://localhost:8085/linea';
  constructor(
    private http : HttpClient,
  ) { }

  getAllLinea():Observable<any>{
    return this.http.get(this.api+`/`);
  }

  getLineaById(id:number):Observable<any>{
    return this.http.get(this.api+`/getLineaById/${id}`);
  }
}
