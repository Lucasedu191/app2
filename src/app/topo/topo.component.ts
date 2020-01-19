import { Component, OnInit } from '@angular/core';
import{OfertaService} from '../ofertas.service'
import { Observable } from 'rxjs';
import {Oferta} from '../shared/oferta.model'
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertaService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  http: any;
  url_api: any;

  constructor(private ofertasService: OfertaService) { }

  ngOnInit() {
  }
  public pesquisa(termoDaBusca: string): void {
    this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca)
    
    this.ofertas.subscribe(
      (ofertas: Oferta[]) => console.log(ofertas),
      //(erro: any) => console.log('Erro status: ', erro.status),
      () => console.log('Fluxo de eventos completo!')
    )
  }

  

}
