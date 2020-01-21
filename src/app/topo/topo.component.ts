import { Component, OnInit } from '@angular/core';
import{OfertaService} from '../ofertas.service'
import { Observable, Subject, of } from 'rxjs';
import {Oferta} from '../shared/oferta.model'
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertaService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>

  private subjectPesquisa: Subject<string> = new Subject <string>()

  constructor(private ofertasService: OfertaService) { }
  
  ngOnInit() {
    this.ofertas = this.subjectPesquisa.pipe( //retorno Oferta[]
    debounceTime(1000),
    distinctUntilChanged(),
    switchMap((termo : string) =>{
      if(termo.trim() === ''){
        return of<Oferta[]>([])
      }
      return this.ofertasService.pesquisaOfertas(termo)
    }),  
    catchError((erro: any, observable : Observable<Oferta[]>) => {
      return of<Oferta[]>([])
    })
    );

  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca)
  }

  public limpaPesquisa() : void {
    this.subjectPesquisa.next('')
  }

}
 