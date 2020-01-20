import { Component, OnInit } from '@angular/core';
import{OfertaService} from '../ofertas.service'
import { Observable, Subject, of } from 'rxjs';
import {Oferta} from '../shared/oferta.model'
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertaService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  public ofertas2: Oferta[]
  private subjectPesquisa: Subject<string> = new Subject <string>()

  constructor(private ofertasService: OfertaService) { }
  
  ngOnInit() {
    this.ofertas = this.subjectPesquisa.pipe( //retorno Oferta[]
    debounceTime(1000),
    distinctUntilChanged(),
    switchMap((termo : string) =>{
      console.log('requisição http para api')
      if(termo.trim() === ''){
        return of<Oferta[]>([])
      }
      return this.ofertasService.pesquisaOfertas(termo)
    }),  
    catchError((erro: any, observable : Observable<Oferta[]>) => {
      console.log(erro)
      return of<Oferta[]>([])
    })
    );
    this.ofertas.subscribe((ofertas: Oferta[]) => {
      console.log (ofertas)
      this.ofertas2 =ofertas
    })
  }

  public pesquisa(termoDaBusca: string): void {
    console.log('keyup caracter: ', termoDaBusca)
    this.subjectPesquisa.next(termoDaBusca)
  }

  

}
