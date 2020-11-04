import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;
  _meta: string;

  constructor(private route:Router, private title: Title, private meta: Meta) {

    this.getDataRoute()
    .subscribe(data =>{
      //console.log(data);
      this.titulo = data.titulo;
      this._meta = data.meta;
      this.title.setTitle(this.titulo);
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this._meta
      }
      this.meta.updateTag(metaTag);
    });

   }

  ngOnInit(): void {
  }

  getDataRoute(){
    return this.route.events
    .pipe(
      filter(evento => evento instanceof ActivationEnd ),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null ),
      map((evento: ActivationEnd)=> evento.snapshot.data)
    );
  }

}
