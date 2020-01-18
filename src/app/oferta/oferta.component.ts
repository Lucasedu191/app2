import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {OfertaService} from '../ofertas.service'
import {Oferta} from '../shared/oferta.model'
import {Observable, interval } from 'rxjs'

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertaService]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta

  constructor( 
    private route: ActivatedRoute,
    private ofertasService: OfertaService
    ) { }

  ngOnInit() {
    this.ofertasService.getOfertaPorId( this.route.snapshot.params['id'])
    .then((oferta: Oferta)=>{
      this.oferta = oferta      
    })
    /*  
    this.route.params.subscribe(
      (parametro : any) => {console.log(parametro)},
      (erro : any) => console.log(erro),
      ()=> console.log('processamento foi classificado como concluido')
    )
    */
    let tempo = interval(2000)
    tempo.subscribe((intervalo : number) =>{
      console.log(intervalo)
    })
  }

}
