import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(public http: HttpClient, 
    public _usuarioService: UsuarioService) {
   }

   borrarHospital(id: string){

    let url = URL_SERVICOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
    .pipe(map(resp => {

      Swal.fire(
        '¡Hospital borrado!',
        'El hospital a sido eliminado correctamente',
        'success'
      )

      return true;

    }));

   }

  cargarHospitales(desde: number = 0){

    let url = URL_SERVICOS +'/hospital?desde=' + desde;

    return this.http.get(url);

  }

  obtenerHospital(id: string){

    let url = URL_SERVICOS +'/hospital/' + id;
    console.log('url',url);
   
    return this.http.get(url);

  }

  crearHospital(	nombre:	string	){

    let url = URL_SERVICOS +'/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url,{nombre})
    .pipe(
      map((resp: any) =>{

        Swal.fire({
          title: 'Hospital creado!',
          text: nombre,
          icon: 'success',
          confirmButtonText: 'Ok'
        });

        return resp.hospital;

      })

    );

  }

  buscarHospital(	termino:	string	){

    let url = URL_SERVICOS + '/busqueda/collection/hospitales/' + termino;

    return this.http.get(url).pipe(map((resp: any)=> resp.hospitales));

  }

  actualizarHospital(	hospital:	Hospital	){

    let url = URL_SERVICOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
    .pipe(
      map((resp: any)=>{

        Swal.fire({
          title: '¡Hospital actualizado!',
          text: resp.hospital.nombre,
          icon: 'success',
          confirmButtonText: 'Ok'
        })

        return resp.hospital;

      })

    );

  }

}
