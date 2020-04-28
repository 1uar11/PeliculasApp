import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];

/*   sladeOpts ={
    slidesPerView:1.3,
    freeMode: true
  } */

  constructor( private moviesService:MoviesService) {}

  ngOnInit(){
    this.moviesService.getCartelera()
    .subscribe(resp => {

      //console.log('Resp',resp);
      this.peliculasRecientes = resp.results; 

    });

    this.getPopulares();

  }

  cargarMas(){
    this.getPopulares();
  }

  getPopulares(){
    this.moviesService.getPopulares()
    .subscribe(resp => {

      //console.log('Popolares', resp);
      //anadiendo a la siguiente pagina con un arreglo temporal para que no se sobre escriba..
      const arrTemp = [ ...this.populares, ...resp.results]
      this.populares = arrTemp;
      
    });
  }

}
