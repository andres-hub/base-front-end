import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import Swal from 'sweetalert2';
import {Modulo} from '../../models/modulos.model'
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-construction-menu',
  templateUrl: './construction-menu.component.html',
  styleUrls: ['./construction-menu.component.css']
})
export class ConstructionMenuComponent implements OnInit {

  public  total: number = 0;
  public modulos: Modulo[] = [];

  constructor(private menuService:MenuService ) { }

  ngOnInit(): void {
    this.menuService.cargarModulos().subscribe(({ok, total, mensaje}) => {
      if(ok){
       this.modulos = mensaje;
       this.total = total
      }else{
        Swal.fire({
          title: mensaje,
          text: `Comuníquese con el administrador del sistema.`,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    });
  }

}
