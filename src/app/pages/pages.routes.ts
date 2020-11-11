import { RouterModule, Routes } from '@angular/router';

// Guards
import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';

import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import {ConstructionMenuComponent}from './construction-menu/construction-menu.component';
import { from } from 'rxjs';



const pagesRoutes: Routes=[

    {path: 'construccion-menu', component: ConstructionMenuComponent, canActivate: [VerificaTokenGuard], data:{titulo: 'Construcción de menús', meta:'Aqui se pone el meta'}},
    {path: 'dashboard', component: DashboardComponent, canActivate: [VerificaTokenGuard] , data:{titulo: 'Dashboard', meta:'Aqui se pone el meta'}}
    // {path:'progress', component: ProgressComponent,  data:{titulo: 'Progress', meta:'Aqui se pone el meta'}},
    // {path: 'graficas1', component: Graficas1Component,data :{titulo: 'Gráficas', meta:'Aqui se pone el meta'}},
    // {path: 'promesas', component: PromesasComponent, data:{titulo: 'Promesas', meta:'Aqui se pone el meta'}},
    // {path: 'rxjs', component: RxjsComponent, data:{titulo: 'Rxjs', meta:'Aqui se pone el meta'}},
    // {path: 'account-settings', component: AccountSettingsComponent, data:{titulo: 'Ajustes del Tema', meta:'Aqui se pone el meta'}},
    // {path: 'perfil', component: ProfileComponent, data:{titulo:'Perfil de usuario'}},
    // {path: 'busqueda/:termino', component: BusquedaComponent, data:{titulo: 'Buscador'}},
    // // Mantenimientos
    // {path: 'usuarios', component: UsuariosComponent,canActivate:[AdminGuard], data:{titulo:'Mantenimiento de Usuarios'}},
    // {path: 'hospitales', component: HospitalesComponent, data:{titulo: 'Mantenimiento de Hospitales'}},
    // {path: 'medicos', component: MedicosComponent, data:{titulo: 'Mantenimiento de Médicos'}},
    // {path: 'medico/:id', component: MedicoComponent, data:{titulo: 'Actualizar Médico'}},
    // {path:'',redirectTo:'/dashboard', pathMatch:'full'}

];

export const PAGES_RUTES = RouterModule.forChild(pagesRoutes);