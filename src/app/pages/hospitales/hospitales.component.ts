import { Component, OnInit } from '@angular/core';
import {Hospital} from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalReguistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalesService: HospitalService,
    public _modalUploadService: ModalUploadService) {}

  ngOnInit(): void {

    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(resp => this.cargarHospitales())

  }

  mostrarModal(id: string){

    this._modalUploadService.mostrarModal('hospitales',id);

  }

  cargarHospitales(){

    this.cargando = true;
    this._hospitalesService.cargarHospitales(this.desde)
    .subscribe((resp: any)=>{

      this.totalReguistros = resp.total;
      this.hospitales = resp.hospitales;
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

    this.cargarHospitales();

  }

  buscarHospital(termino: string){

    if(termino.length <= 0){
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalesService.buscarHospital(termino).subscribe((hospitales: Hospital[])=>{

      this.hospitales = hospitales;
      this.cargando = false;

    });

  }

  borrarHospital(hospital: Hospital){

    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta a punto de borrar a ${hospital.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {

        this._hospitalesService.borrarHospital(hospital._id)
        .subscribe(resp => {
          this.cargarHospitales();
        });

      }
    })

  }

  guardarHospital(hospital: Hospital){

    console.log(hospital);

    this._hospitalesService.actualizarHospital(hospital).subscribe();

  }

  crearHospital(){

    Swal.fire({
      title: 'Craer hospital',
      text: 'Ingrese el nombre del hospital',
      icon: 'info',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }

        this._hospitalesService.crearHospital(value).subscribe();

      }
    })

  }

}