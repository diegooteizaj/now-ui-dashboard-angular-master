import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/admin/icons', title: 'Icons',  icon:'education_atom', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },

    { path: '/admin/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
    // { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },
    { path: '/admin/ductos', title: 'Ductos',  icon:'objects_spaceship', class: '' },
    { path: '/admin/dashboard-test', title: 'Dashboard test',  icon:'objects_spaceship', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'objects_spaceship', class: 'active active-pro' }

];



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  cerrarSesion:string='/admin/modal-cerrar-sesion';
  modalCerrarSesion:boolean=false;

  constructor(
    private router: Router
  ) { }


  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };

  modalCerrarSesionFuncion(){
    this.modalCerrarSesion=true;
  }

  salirSistema(){
    this.router.navigate(['/']);
  }

  CancelarSalirSistema(){
    this.modalCerrarSesion=false;
  }
}
