import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { URL_SERVICOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { throwError } from 'rxjs';


@Injectable()
export class UsuarioService {

  usuario:Usuario;
  token:string;
  menu: any = [];

  constructor( 
    public http: HttpClient, 
    public router:Router, 
    public _subirArchivoService: SubirArchivoService
    ) {

    this.cargarStorage();

   }

   renuevaToken(){

    let url = URL_SERVICOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get(url)
    .pipe(
      map((resp:any) => {

      this.token = resp.token;
      localStorage.setItem('token', this.token);

      return true;

      }),
      catchError((err: HttpErrorResponse) =>{

        this.router.navigate(['/login']);
        Swal.fire({
          title: '¡No se puedo renovar token!',
          text: 'No fue posible renovar token',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        
        return throwError(err);

      })

    );

   }

   estaLogueado(){

    return (this.token.length > 5)?true:false;

   }

   cargarStorage(){

    if(localStorage.getItem('token')){

      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));

    }else{
      this.token = '';
      this.usuario = null;
      this.menu = null;
    }

   }

   guardarStorage(id:string,token:string,usuario:Usuario, menu:any){

    localStorage.setItem('id',id);
    localStorage.setItem('token',token);
    localStorage.setItem('usuario',JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

   }

   logout(){
     this.usuario = null;
     this.token = '';
     this.menu = [];

     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     localStorage.removeItem('menu');

    this.router.navigate(['/login']);

   }

   loginGoogle(token:string){

    let url = URL_SERVICOS + '/login/google';

    return this.http.post(url,{token})
    .pipe(
      map((resp:any)=>{

        this.guardarStorage(resp.id,resp.token,resp.usuario, resp.menu);
        return true;

      })
    );

   }

   login(usuario: Usuario, recordar: boolean = false){

    if(recordar){
      localStorage.setItem('email', usuario.email);
    }else{

      localStorage.removeItem('email');

    }

    let url = URL_SERVICOS + '/login';
    return this.http.post(url, usuario )
    .pipe(
      
      map((resp: any) =>{
        
        this.guardarStorage(resp.id,resp.token,resp.usuario, resp.menu);
        
        return true;
        
      }),
      catchError((err: HttpErrorResponse) =>{

        Swal.fire({
          title: '¡Erro en el login!',
          text: err.error.mensaje,
          icon: 'error',
          confirmButtonText: 'OK'
        })
        
        return throwError(err);

      })

      
    );

   }

   crearUsuario(usuario: Usuario){

    let url = URL_SERVICOS +'/usuario';

    return this.http.post(url,usuario)
    .pipe(
      map((resp: any) =>{

        Swal.fire({
          title: 'Usuario creado!',
          text: usuario.email,
          icon: 'success',
          confirmButtonText: 'Ok'
        });

        return resp.usuario;

      }),
      catchError((err: HttpErrorResponse) =>{

        console.log(err);

        Swal.fire({
          title: err.error.mensaje,
          text: err.error.errors.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })

        return throwError(err);

      })

    );

   }

   actualizarUsuario(usuario: Usuario){

    let url = URL_SERVICOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
    .pipe(
      map((resp: any)=>{

        if(usuario._id === this.usuario._id){
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id,this.token,usuarioDB,this.menu);
        }

        Swal.fire({
          title: '¡Usuario actualizado!',
          text: usuario.nombre,
          icon: 'success',
          confirmButtonText: 'Ok'
        })

        return true;

      }),
      catchError((err: HttpErrorResponse) =>{

        console.log(err);

        Swal.fire({
          title: err.error.mensaje,
          text: err.error.errors.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })

        return throwError(err);

      })
    );

   }

   cambiarImagen(archivo: File, id:string){

    this._subirArchivoService.subirArchivo(archivo,'usuarios', id)
    .then( (resp: any)=>{

      this.usuario.img = resp.usuario.img;

      Swal.fire({
        title: 'Imagen actualizado!',
        text: this.usuario.nombre,
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      this.guardarStorage(id, this.token, this.usuario, this.menu);

      }
    )
    .catch(resp =>{
      console.log(resp);
    });

   }

   cargarUsuarios(desde: number = 0){

    let url = URL_SERVICOS +'/usuario?desde=' + desde;

    return this.http.get(url);

   }

   buscarUsuarios(termino: string){

    let url = URL_SERVICOS + '/busqueda/collection/usuarios/' + termino;

    return this.http.get(url).pipe(map((resp: any)=> resp.usuarios));

   }

   borrarUsuario(id: string){

    let url = URL_SERVICOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
    .pipe(map(resp => {

      Swal.fire(
        '¡Usuario borrado!',
        'El susuario a sido eliminado correctamente',
        'success'
      )

      return true;

    }));

   }

}
