import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiDuctosService {

  private api = 'https://api.appultrasound.cl/ductos';
  constructor(
    private http : HttpClient,
  ) { }

  getAllDuctos():Observable<any>{
    return this.http.get(this.api+'/');
  }

  getDuctoById(id:number):Observable<any>{
    return this.http.get(this.api+`/getDuctoById/${id}`);
  }

  getDuctosEstadoCorreccion():Observable<any>{
    return this.http.get(this.api+'/getDuctosEstadoCorreccion');
  }

  createNewDucto(ducto: any): Observable<any> {
    return this.http.post(this.api + '/addDucto', ducto);
  }
}
