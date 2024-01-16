import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiTipoMaterialService {

  private api = 'http://localhost:8085/tipoMaterial';
  constructor(
    private http : HttpClient,
  ) { }
  getAllTipoMaterial():Observable<any>{
    return this.http.get(this.api+`/`);
  }

  getTipoMaterialById(id:number):Observable<any>{
    return this.http.get(this.api+`/getTipoMaterialById/${id}`);
  }
}
