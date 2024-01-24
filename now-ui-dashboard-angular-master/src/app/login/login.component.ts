import { Component, OnInit } from '@angular/core';
import { ApiLoginService } from '../service/api-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  password: string = ''; // Propiedad para rastrear el valor del campo de contraseña
  isButtonDisabled: boolean = true; // P
  mensajeErrorLogin: boolean = false; // Mensaje de error al momento de hacer login.
  glosaMensajeError: string = 'Usuario o Contraseña Invalida.'
  user:string = 'supervisor@ultrasound.com';
  pass:string = 'admin';
  username: string = '';
  //password: string = '';
  mensajeOk:boolean = false;
  mensajeOkGlosa : string = 'validacion Exitosa 200 ok.'

  constructor(
    private apiLoginService:ApiLoginService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  updateButtonState() {
    // Actualizar el estado del botón basado en si hay texto en el campo de contraseña
    this.isButtonDisabled = this.password.length === 0;
  }

  realizarLogin() {
    console.log('uasername : ',this.username);
    console.log('passwoerd : ',this.password);

    this.apiLoginService.obtenerUsuario(this.username, this.password).subscribe(
      (response) => {
        // Manejar la respuesta del servidor aquí
        console.log(response);
        this.mensajeOk = true;
        this.router.navigate(['/admin/dashboard']);
      },
      (error) => {
        // Manejar los errores aquí
        console.error(error);
      }
    );
  }
  //Prueba de qa

  recibirMensajeSalir(x:any){
    if(x==true){
      this.mensajeOk = false;
    }
  }

}
