import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuaioService: UsuarioService
  ) { }

  cargarMedicos(){

    let url = URL_SERVICOS + '/medico';

    return this.http.get(url)
    .pipe(
      map((resp: any) =>{

        this.totalMedicos = resp.total;
        return resp.medicos;

      })
    );

  }

  cargarMedico(id: string){

    let url = URL_SERVICOS + '/medico/' + id;

    return this.http.get(url).pipe(map((resp:any)=>{ return resp.medico}));

  }

  buscarMedicos(termino: string){

    let url = URL_SERVICOS + '/busqueda/collection/medicos/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.medicos));

  }

  borrarMedico(id: string){

    let url = URL_SERVICOS + '/medico/' + id;
    url += '?token=' + this._usuaioService.token;

    return this.http.delete(url)
    .pipe(map(resp=>{

      Swal.fire({
         title: '¡Médico Borrado!',
         text: 'Médico borrado correctamente',
         icon: 'success',
         confirmButtonText: 'Ok'
      })

      return resp;

    }));

  }

  guardarMedico(medico:Medico){

    let url = URL_SERVICOS + '/medico';
   

    if(medico._id){
      // actualizando

      url += '/' + medico._id;
      url += `?token=${this._usuaioService.token}`;

      return this.http.put(url, medico).pipe(map((resp: any)=>{

        Swal.fire({
          title: '¡Médico actualizado!',
          text: medico.nombre,
          icon: 'success',
          confirmButtonText: 'Ok'
       })

       return resp.medico;

      }));

    }else{
      // creando

      url += `?token=${this._usuaioService.token}`;
      return this.http.post(url, medico)
      .pipe(map((resp:any)=>{

        Swal.fire({
           title: '¡Médico creado!',
           text: medico.nombre,
           icon: 'success',
           confirmButtonText: 'Ok'
        })
  
        return resp.medicoGuardado;
  
      }));

    }


  }


}
