import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { URL_SERVICOS } from 'src/app/config/config';

import { UsuarioService } from './usuario/usuario.service';

import { CargarModulo } from '../interfaces/cargar-modulos.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
 

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarModulos(desde: number = 0){
    let url = `${URL_SERVICOS}/modulo?token=${this._usuarioService.token}&desde=${desde}`;
    return this.http.get<CargarModulo>(url);
  }


}
