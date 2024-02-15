import { Component, OnInit } from '@angular/core';
import { ApiLoginService } from '../service/api-login.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  listaUsuario:any=[];
  modalIngresarUsuario:boolean=false;

  idUsuario:string='';
  nombre:string='';
  correo:string='';
  password:string='';
  idRol:string='';

  constructor(
    private usuarioService : ApiLoginService
  ) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe((usr: any[]) => {
      this.listaUsuario = usr; 
      console.log('this.listaUsuario',this.listaUsuario);
    });

  }

  currentPage = 1;
  itemsPerPage = 15; 

  // Método para cambiar de página
  pageChanged(event: any): void {
    console.log('$event',event);
    this.currentPage = event;
  }

  ingresarUsuario(){
    this.modalIngresarUsuario = true;
  }

  closeModalIngresar(){
    this.modalIngresarUsuario=false;
  }

  confirmarIngresar(){
    let body = {
      id_rol:parseInt(this.idRol) ,
      nombre:this.nombre,
      correo:this.correo,
      password:this.password,
      idRol:parseInt(this.idRol)
    }


  }
}
