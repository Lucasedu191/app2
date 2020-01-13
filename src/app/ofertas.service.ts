
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Oferta } from './shared/oferta.model'

@Injectable()

export class OfertaService{

    constructor(private http : HttpClient){}
    
    public getOfertas():Promise<Oferta[]>{
        
        return this.http.get('http://localhost:3000/ofertas?destaque=true')
        .toPromise()
        .then((resposta : any ) => resposta)
        //retornar uma promisse oferta[]
    }

}