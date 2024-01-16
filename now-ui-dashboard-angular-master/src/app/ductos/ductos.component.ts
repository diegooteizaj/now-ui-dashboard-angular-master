import { Component, OnInit } from '@angular/core';
import { ApiDuctosService } from '../service/api-ductos.service';
import { Utils } from '../utils';

@Component({
  selector: 'app-ductos',
  templateUrl: './ductos.component.html',
  styleUrls: ['./ductos.component.scss']
})
export class DuctosComponent implements OnInit {

  listaDuctos: any=[];
  constructor(
    private ductoService: ApiDuctosService
  ) { }

  ngOnInit(): void {
    this.ductoService.getAllDuctos().subscribe((ducto: any[]) => {
      console.log('lista de ducto', ducto);
      this.listaDuctos = ducto;
    });
  }

  // formatearFecha(fechaString: string): string {
  //   return Utils.transformarFecha2(fechaString);

  // }

  
}
