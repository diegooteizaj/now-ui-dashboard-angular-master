import { Component, OnInit } from '@angular/core';
import { ApiDuctosService } from '../service/api-ductos.service';
import jsPDF from 'jspdf';
import * as QRCode from 'qrcode';
import * as moment from 'moment';
import { ApiTipoMaterialService } from '../service/api-tipo-material.service';
import { ApiLineaService } from '../service/api-linea.service';
import { ApiMedicionService } from '../service/api-medicion.service';

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
  listaDeIds:any=[];
  fechaFormateada:any;

  lineas:any=[];
  tipoMaterial:any=[];

  modalIngreasrDuctos:boolean=false;
  modalEditarDuctos:boolean=false;

  ductoEditar:any=[];

  //para modal Ingresar
  //modalIngreasrDuctos: boolean = true; // Suponiendo que esta variable controla la visibilidad del modal
  idDucto: string = '';
  idFabricacion: string = '';
  tipoMaterialSeleccionado: string = '';
  fechaMontaje: string = '';
  lineaSeleccionada: string = '';
  numeroTramo: string = '';
  girado: string = '';

  //Modal Anillos
  modalAnillos:boolean=false;

  constructor(
    private ductoService: ApiDuctosService,
    private tipoMaterialService:ApiTipoMaterialService,
    private lineaService:ApiLineaService,
    private medicionService: ApiMedicionService
  ) { }

  ngOnInit(): void {
    this.ductoService.getAllDuctos().subscribe((ducto: any[]) => {
      console.log('lista de ducto', ducto);
      this.listaDuctos = ducto; 
    });
    this.lineaService.getAllLinea().subscribe((linea: any[])=>{
      console.log('lista de linea',linea);
      this.lineas = linea;
    });
    this.tipoMaterialService.getAllTipoMaterial().subscribe((tm: any[])=>{
      console.log('lista de tm',tm);
      this.tipoMaterial = tm;
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
    console.log('this.listaDeIds',this.listaDuctos);
   
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
    }
    this.ductoUrl = 'http://localhost:8085/ductos'+`/getDuctoById/${id}`;
    this.id_descarga = id;
  }

  closeModalQR(){
    this.modalQr = false;
  }

  async downloadPDF(id: any): Promise<void>  {
    const doc = new jsPDF();

    // Agregar título
    const title = `Ducto ${id}`;
    doc.text(title, doc.internal.pageSize.getWidth() / 2, 10, { align: 'center' });

          // Obtener dimensiones de la imagen
          const imageWidth = 70;
          const imageHeight = 40;
    
          // Calcular coordenadas para centrar la imagen
          const xImage = (doc.internal.pageSize.getWidth() - imageWidth) / 2;
          const yImage = 30; // Puedes ajustar según tus necesidades
    
          // Ruta de la imagen
          const imageUrl = './assets/img/LOGO ULTRA SOUND ok_Mesa de trabajo 1 copia 4.png';
    
          // Obtener la imagen en base64
          const imageBase64: string = await this.getImageBase64(imageUrl);
    
          // Añadir la imagen al documento PDF
          doc.addImage(imageBase64, 'PNG', xImage, yImage, imageWidth, imageHeight);

    // Generar el código QR
    QRCode.toDataURL(this.ductoUrl + `/${id}`, { errorCorrectionLevel: 'H' }, function (err, url) {
      if (err) {
        console.error('Error al generar el código QR:', err);
        return;
      }

      // Obtener dimensiones de la imagen
      const imgWidth = 100; // ajusta según tus necesidades
      const imgHeight = 100; // ajusta según tus necesidades

      // Calcular coordenadas para centrar la imagen debajo del título
      const x = (doc.internal.pageSize.getWidth() - imgWidth) / 2;
      const y = 30; // Margen superior de 30px desde la posición del título

      // Insertar el código QR en el documento PDF
      doc.addImage(url, 'JPEG', x, y, imgWidth, imgHeight);

      // Guardar el documento PDF
      doc.save(`Qr_Ducto_${id}.pdf`);
    });
  }


  async generarPDFsMasivos(): Promise<void> {
    const doc = new jsPDF();

    this.listaDeIds = [];
    let obj = {};

    for (const element of this.listaDuctos) {
      obj = {
        id: element.id_ducto,
        nombre: this.obtenerLineasPorId(element.id_linea),
      };

      this.listaDeIds.push(obj);
    }

    console.log('this.listaDeIds', this.listaDeIds);

    for (let index = 0; index < this.listaDeIds.length; index++) {
      // Añadir nueva página al PDF (excepto para la primera página)
      if (index > 0) {
        doc.addPage();
      }

      const title = `Ducto ${this.listaDeIds[index].id} de ${this.listaDeIds[index].nombre}`;
      doc.setFontSize(16);
      doc.text(title, doc.internal.pageSize.getWidth() / 2, 10, { align: 'center' });

      // Obtener dimensiones de la imagen
      const imageWidth = 70;
      const imageHeight = 40;

      // Calcular coordenadas para centrar la imagen
      const xImage = (doc.internal.pageSize.getWidth() - imageWidth) / 2;
      const yImage = 30; // Puedes ajustar según tus necesidades

      // Ruta de la imagen
      const imageUrl = './assets/img/LOGO ULTRA SOUND ok_Mesa de trabajo 1 copia 4.png';

      // Obtener la imagen en base64
      const imageBase64: string = await this.getImageBase64(imageUrl);

      // Añadir la imagen al documento PDF
      doc.addImage(imageBase64, 'PNG', xImage, yImage, imageWidth, imageHeight);

      // Obtener dimensiones del código QR
      const qrWidth = 100;
      const qrHeight = 100;

      // Calcular coordenadas para centrar el código QR
      const xQR = (doc.internal.pageSize.getWidth() - qrWidth) / 2;
      const yQR = yImage + imageHeight + 10; // Espacio entre la imagen y el código QR

      // Generar el código QR
      QRCode.toDataURL('http://localhost:8085/ductos/getDuctoById' + `/${this.listaDeIds[index].id}`, { errorCorrectionLevel: 'H' }, (err, url) => {
        if (err) {
          console.error('Error al generar el código QR:', err);
          return;
        }

        // Insertar el código QR en la página del documento PDF
        doc.addImage(url, 'JPEG', xQR, yQR, qrWidth, qrHeight);

        // Si es la última iteración, guardar el documento PDF
        if (index === this.listaDeIds.length - 1) {
          doc.save('Qr_Ductos_Masivos.pdf');
        }
      });
    }
  }
  formatearFecha(fecha:any) {
    // Parsear la fecha original usando moment.js
    const fechaMoment = moment(fecha);

    // Formatear la fecha según el formato DD/MM/YYYY
    return this.fechaFormateada = fechaMoment.format('DD/MM/YYYY');
  }

  obtenerTipoMaterialPorId(id: number) {
    if (!this.tipoMaterial) {
      console.error('El array tipoMaterial es undefined.');
      return ''; // o maneja de otra manera
    }
  
    const tipoMaterialEncontrado = this.tipoMaterial.find((tipoMaterial: any) => tipoMaterial.id_tipo_material === id);
  
    if (!tipoMaterialEncontrado) {
      console.error(`No se encontró ningún tipo de material con el ID ${id}.`);
      return ''; // o maneja de otra manera
    }
  
    return tipoMaterialEncontrado.nombre;
  }

  obtenerLineasPorId(id:number){
    //console.log
    const lineaEncontrada = this.lineas.find((linea:any) => linea.id_linea === id);
    console.log('lineaEncontrada',lineaEncontrada);
    return lineaEncontrada.nombre;
    
  }

  openModalIngresar(){
    this.modalIngreasrDuctos = true;
  }

  closeModalIngresar(){
    this.modalIngreasrDuctos = false;
  }


  async getImageBase64(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async openModalEditar(id: number): Promise<void> {
    console.log('id', id);
    this.ductoEditar = []; // Inicializar ductoEditar
  
    try {
      const data = await this.ductoService.getDuctoById(id).toPromise();
      console.log('data', data);
      this.ductoEditar.push(data); // Asignar los datos del ducto
      this.modalEditarDuctos = true; // Abrir el modal después de cargar los datos
    } catch (error) {
      console.error('Error al obtener el ducto por ID:', error);
    }
  }
  

  closeModalEditar(){
    this.modalEditarDuctos=false;
  }

  guardarDatos() {
    // Aquí puedes guardar los datos en un objeto o hacer lo que necesites con ellos
    const datosDuctos = {
      id_ducto: parseInt(this.idDucto),
      id_fabricacion: parseInt(this.idFabricacion),
      id_tipo_material: this.buscarTipoMaterialPorNombre(this.tipoMaterialSeleccionado),
     // fecha_montaje: new Date(this.fechaMontaje),
     fecha_montaje: this.formatearFechaParaBD(this.fechaMontaje),
     id_linea: this.buscarLineaSeleccionadaPorNombre(this.lineaSeleccionada),
      N_Tramo: this.numeroTramo,
      girado: this.girado == 'SI' ? 1 : 0
    };

    console.log(datosDuctos); // Para ver los datos en la consola
    console.log('datos a ingresar',datosDuctos);
     // Llama al método createNewDucto del servicio ApiDuctosService para enviar los datos del ducto al servidor y crear un nuevo ducto
     this.ductoService.createNewDucto(datosDuctos).subscribe(
      
      (response) => {
        console.log('Ducto creado correctamente. ID del ducto creado:', response.insertedDuctoId);
        this.modalIngreasrDuctos = false;
        this.ngOnInit();
        // Aquí puedes manejar la respuesta del servidor después de crear el ducto, como actualizar la lista de ductos, mostrar un mensaje de éxito, etc.
      },
      (error) => {
        console.error('Error al crear el ducto:', error);
        // Aquí puedes manejar los errores, como mostrar un mensaje de error al usuario, registrar el error en un servicio de registro de errores, etc.
      }
      
    );

    
  }

  buscarLineaSeleccionadaPorNombre(nombre:string){
    const lineaEncontrada = this.lineas.find(linea => linea.nombre === nombre);
    // Si se encontró la línea, se devuelve su id_linea, de lo contrario se devuelve undefined
    return lineaEncontrada ? lineaEncontrada.id_linea : -1;
  }

  buscarTipoMaterialPorNombre(nombre:string){
    const tipoMaterialEncontrado = this.tipoMaterial.find(linea => linea.nombre === nombre);
    // Si se encontró la línea, se devuelve su id_linea, de lo contrario se devuelve undefined
    return tipoMaterialEncontrado ? tipoMaterialEncontrado.id_tipo_material : -1;
  }


formatearFechaParaBD(fechaString: string): string {
  // Dividir la cadena de fecha en día, mes y año
  const partesFecha: string[] = fechaString.split('-');
  const dia: string = partesFecha[0];
  const mes: string = partesFecha[1];
  const anio: string = partesFecha[2];

  // Formatear la fecha en el formato esperado por la base de datos (YYYY-MM-DD)
  return `${anio}-${mes}-${dia}`;
}


anilloSeleccionado:any;
tramoSeleccionado:any;
idSeleccionado:any;
girados:any;
medicion:any;

bodyVacio:boolean=false;
openModalAnillos(id:number,anillos:any,n_tramo:any,girado:any){
  if(anillos == 'A' || anillos =='B' || anillos=='C'){
    if(id!=null){

      const body = {
        id_ducto:id,
        anillo:anillos
      }
    
      this.medicionService.getMedicion(body).subscribe((response)=>{
        this.medicion =  response;
        if(this.medicion.length==0){
          this.bodyVacio=true;
        }else{
          this.bodyVacio=false;
        }
        console.log(response);
        this.modalAnillos=true;
      });
    

    }
  }

  this.anilloSeleccionado = anillos;
  this.idSeleccionado = id;
  this.tramoSeleccionado = n_tramo;
  this.girados = girado;

}

closeModalAnillos(){
  this.modalAnillos=false;
}

spinner:boolean = false;
imprimirQR(){
  this.spinner=true;
 this.generarPDFsMasivos();
  setTimeout(() => {
    this.spinner = false; // Desactiva el spinner después de tres segundos
  }, 4000);

}

}
