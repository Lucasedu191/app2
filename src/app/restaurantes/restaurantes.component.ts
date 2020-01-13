import { Component, OnInit } from '@angular/core';
import {Oferta} from '../shared/oferta.model'
import {OfertaService} from '../ofertas.service'
@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [OfertaService]
})
export class RestaurantesComponent implements OnInit {

  constructor(private ofertaService: OfertaService) { }

  ngOnInit() {
    this.ofertaService.getOfertasPorCategoria('restaurante')
    .then((ofertas: Oferta[] ) => {
      console.log(ofertas)
    })
  }

}
