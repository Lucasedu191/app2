
import { HttpClient } from '@angular/common/http'
import {HttpResponse} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Oferta } from './shared/oferta.model'
import {URL_API} from './app.api'
import { EMPTY,Observable} from 'rxjs'
import { retry } from 'rxjs/operators'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment.prod'
//import 'rxjs/add/operator/toPromise'
//import 'rxjs/add/operator/map'

@Injectable()

export class OfertaService{
    //private url_api = 'http://localhost:3000/ofertas'
    constructor(private http : HttpClient){}
    
    public getOfertas():Promise<Oferta[]>{
        
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
        .toPromise()
        .then((resposta : any ) => resposta)
        //retornar uma promisse oferta[]
    }

    public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]>{
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
        .toPromise()
        .then((resposta: any) => resposta)
    }
    public getOfertaPorId(id: number) : Promise<Oferta>{
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
        .toPromise()
        .then((resposta: any) =>{
            return resposta [0]
        })
    }
    public getComoUsarOfertaPorId(id: number):Promise<string>{
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
        .toPromise()
        .then((resposta : any) =>{
            return resposta[0].descricao
        })
    }
    public getOndeFicaOfertaPorId(id: number):Promise<string>{
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
        .toPromise()
        .then((resposta : any) =>{
            return resposta[0].descricao
        })
    }
    public pesquisaOfertas(termo:string): Observable<Oferta[]>{
        return this.http.get(`${URL_API}?descricao_oferta_like=${termo}`)
        .pipe(retry(10))
        .pipe(map((resposta : any ) => resposta))
        }
}