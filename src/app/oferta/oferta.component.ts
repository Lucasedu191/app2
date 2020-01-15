import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {OfertaService} from '../ofertas.service'
import {Oferta} from '../shared/oferta.model'
@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertaService]
})
export class OfertaComponent implements OnInit {

  

  constructor( 
    private route: ActivatedRoute,
    private ofertasService: OfertaService
    ) { }

  ngOnInit() {
    this.ofertasService.getOfertaPorId( this.route.snapshot.params['id'])
    .then((oferta: Oferta)=>{
      console.log(oferta)
    })  
  }

}
