import { Component, OnInit } from '@angular/core';
import {Oferta} from '../shared/oferta.model'
import {OfertaService} from  '../ofertas.service'
@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css'],
  providers: [OfertaService]
})
export class DiversaoComponent implements OnInit {

  public ofertas: Oferta[]

  constructor(private ofertasServise: OfertaService) { }

  ngOnInit() {
    this.ofertasServise.getOfertasPorCategoria('diversao')
    .then((ofertas: Oferta[])=>{
      this.ofertas = ofertas
    })
  }

}
