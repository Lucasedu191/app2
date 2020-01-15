
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

    public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]>{
        return this.http.get(`http://localhost:3000/ofertas?categoria=${categoria}`)
        .toPromise()
        .then((resposta: any) => resposta)
    }
    public getOfertaPorId(id: number): Promise<Oferta>{
        return this.http.get(`http://localhost:3000/ofertas?id=${id}`)
        .toPromise()
        .then((resposta: any) =>{
            console.log(resposta.shift())
            return resposta
        })

    }

}