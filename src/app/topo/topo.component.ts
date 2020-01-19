import { Component, OnInit } from '@angular/core';
import{OfertaService} from '../ofertas.service'
import { Observable, Subject } from 'rxjs';
import {Oferta} from '../shared/oferta.model'
import { switchMap, debounceTime, } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

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
    switchMap((termo : string) =>{
      console.log('requisição http para api')
      if(termo.trim() === ''){
        return of<Oferta[]>([]);
      }
      return this.ofertasService.pesquisaOfertas(termo)
    })  
    );
    this.ofertas.subscribe((ofertas: Oferta[]) => console.log(ofertas))
  }

  public pesquisa(termoDaBusca: string): void {
    console.log('keyup caracter: ', termoDaBusca)
    this.subjectPesquisa.next(termoDaBusca)
  }

  

}
