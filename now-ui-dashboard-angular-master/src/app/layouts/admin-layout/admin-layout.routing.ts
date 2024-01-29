import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { DuctosComponent } from '../../ductos/ductos.component';
import {LoginComponent} from '../../login/login.component'
import { DashboardTestComponent } from '../../dashboard-test/dashboard-test.component'
import { ModalCerrarSesionComponent } from '../../modal-cerrar-sesion/modal-cerrar-sesion.component';
import { UsuariosComponent } from '../../usuarios/usuarios.component';
import { ReportesComponent } from '../../reportes/reportes.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'ductos',         component: DuctosComponent },
    { path: 'login',          component: LoginComponent},
    { path: 'dashboard-test',          component: DashboardTestComponent},
    {path: 'modal-cerrar-sesion' ,component:ModalCerrarSesionComponent},
    {path: 'usuarios' ,component:UsuariosComponent},
    {path: 'reportes' ,component:ReportesComponent}
];
