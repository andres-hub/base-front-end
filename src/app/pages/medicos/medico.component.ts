import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('','','','','');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) { 

    activatedRoute.params.subscribe(params =>{

      let id = params['id'];

      if(id !== 'nuevo'){
        this.cargarMedico(id);
      }

    });

  }

  ngOnInit(): void {

    this._hospitalService.cargarHospitales()
    .subscribe((resp: any)=>{
      this.hospitales = resp.hospitales;
    });

    this._modalUploadService.notificacion
    .subscribe(resp => {
      this.medico.img = resp.medico.img;
    });

  }

  cargarMedico(id:string){

    this._medicoService.cargarMedico(id).subscribe( (medico: any) =>{

      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);

  });

  }

  guardarMedico(f:NgForm){

    if(f.invalid){
      return;
    }

    this._medicoService.guardarMedico(this.medico).subscribe((medicoGuardado)=>{

      this.medico._id = medicoGuardado._id;
      this.router.navigate(['/medico', medicoGuardado._id]);

    });

  }

  cambioHospital(id: string){

    this._hospitalService.obtenerHospital(id)
    .subscribe((resp: any)=>{this.hospital = resp.hospital});

  }

  cambiarFoto(){

    this._modalUploadService.mostrarModal('medicos', this.medico._id);

  }

}
