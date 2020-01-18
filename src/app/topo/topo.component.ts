import { Component, OnInit } from '@angular/core';
import{OfertaService} from '../ofertas.service'
import { from, Observable } from 'rxjs';
import {Oferta} from '../shared/oferta.model'
@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertaService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>

  constructor(private ofertasService: OfertaService) { }

  ngOnInit() {
  }

  public pesquisa(termoDaBusca: string): void {
    this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca)
    console.log
  }

}
