import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {OfertaService} from '../ofertas.service'
import {Oferta} from '../shared/oferta.model'
import {interval, Observable, Observer, Subscription} from 'rxjs'
//import {Observer } from 'rxjs/Observer'


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertaService]
})
export class OfertaComponent implements OnInit, OnDestroy {
  private tempoObservableSubscription : Subscription
  private meuObservableTesteSubscription : Subscription

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

    this.tempoObservableSubscription = tempo.subscribe((intervalo : number) =>{
      console.log(intervalo)
    })
    
    //Observable (observavel)
    let meuObservableTeste = Observable.create((observer : Observer<number>) =>{
      observer.next(1)
      observer.next(3)
      observer.complete()
      observer.next(3)
    })
    //Observable (observador)
    this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
      (resultado: any )=>console.log(resultado +10),
      (erro: string) => console.log(erro),
      () => console.log('Stream de eventos foi finalizada')
      )
  }

  ngOnDestroy(){
    this.meuObservableTesteSubscription.unsubscribe()
    this.tempoObservableSubscription.unsubscribe()
  }

}
