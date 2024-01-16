import { Component, OnInit } from '@angular/core';
import { ApiDuctosService } from '../service/api-ductos.service';
import { Utils } from '../utils';
import { Observable } from 'rxjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ductos',
  templateUrl: './ductos.component.html',
  styleUrls: ['./ductos.component.scss']
})
export class DuctosComponent implements OnInit {

  title = 'app';
  elementType = 'url';
  value = 'Techiediaries';
  listaDuctos: any=[];
  modalQr:boolean=false;
  ducto:any;
  ductoUrl:any;
  id_descarga:any;
  constructor(
    private ductoService: ApiDuctosService
  ) { }

  ngOnInit(): void {
    this.ductoService.getAllDuctos().subscribe((ducto: any[]) => {
      console.log('lista de ducto', ducto);
      this.listaDuctos = ducto;
    });
  }

  currentPage = 1;
  itemsPerPage = 15; // Cambia esto según tus necesidades

  // Método para cambiar de página
  pageChanged(event: any): void {
    console.log('$event',event);
    this.currentPage = event;
  }

  abrirModalQr(id:any){
    if(id !== null){
      this.modalQr = true;
      this.ductoService.getDuctoById(id).subscribe(
        (data) => {
          console.log('data',data)
          this.ducto = data;
        },
        (error) => {
          console.error('Error al obtener el ducto por ID:', error);
        }
      );
      console.log('this.ducto$',this.ducto);
    }
    this.ductoUrl = 'http://localhost:8085/ductos'+`/getDuctoById/${id}`;
    this.id_descarga = id;
  }

  closeModalQR(){
    this.modalQr = false;
  }

  public downloadPDF(id:any): void {
    const doc = new jsPDF();

    doc.text('Hello world!', 10, 10);
    doc.save(`Qr_Ducto_${id}.pdf`);
  }



  // formatearFecha(fechaString: string): string {
  //   return Utils.transformarFecha2(fechaString);

  // }

  
}
