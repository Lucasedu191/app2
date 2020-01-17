import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router'
import {OfertaService} from '../../ofertas.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertaService]
})
export class ComoUsarComponent implements OnInit {

    public comoUsar: string =''
  constructor(private route: ActivatedRoute,
    private ofertasService: OfertaService) { }

  ngOnInit() {
    this.ofertasService.getComoUsarOfertaPorId ( this.route.parent.snapshot.params['id'])
    .then((descricao : string) => {
      this.comoUsar = descricao
    })
  }

}
