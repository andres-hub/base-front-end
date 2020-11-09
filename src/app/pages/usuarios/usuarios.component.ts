import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = []; 
  desde: number = 0;
  totalReguistros: number = 0;
  cargando: boolean = true;

  constructor( 
    public _usuariosService: UsuarioService, 
    public _modalUploadService: ModalUploadService) { }

  ngOnInit(): void {

    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(resp => this.cargarUsuarios())

  }

  mostrarModal(id: string){

    this._modalUploadService.mostrarModal('usuarios',id);

  }

  cargarUsuarios(){

    this.cargando = true;
    this._usuariosService.cargarUsuarios(this.desde)
    .subscribe((resp: any)=>{

      this.totalReguistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;

    });

  }

  cambiarDesde(valor: number){

    let desde = this.desde + valor;

    if (desde >= this.totalReguistros) {
      return;
    }

    if (desde <0) {
      return;
    }

    this.desde += valor;

    this.cargarUsuarios();

  }

  buscarUsuario(termino: string){

    if(termino.length <= 0){
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuariosService.buscarUsuarios(termino).subscribe((usuarios: Usuario[])=>{

      this.usuarios = usuarios;
      this.cargando = false;

    });

  }

  borrarUsuario(usuario: Usuario){

    console.log(usuario);

    if(usuario._id === this._usuariosService.usuario._id){

      Swal.fire({
         title: '¡No puede borrar usuario!',
         text: 'No se puede borrar a si mismo',
         icon: 'error',
         confirmButtonText: 'Ok'
      })

      return;

    }

    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta a punto de borrar a ${usuario.names}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {

        this._usuariosService.borrarUsuario(usuario._id)
        .subscribe(resp => {
          this.cargarUsuarios();
        });

      }
    })

  }

  guardarUsuario(usuario: Usuario){

    this._usuariosService.actualizarUsuario(usuario).subscribe();

  }

}
