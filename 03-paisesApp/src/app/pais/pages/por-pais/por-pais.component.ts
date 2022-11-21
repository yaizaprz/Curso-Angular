import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li{
      cursor:pointer;
    }
  `
  ]
})

export class PorPaisComponent{

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean=false;

  constructor(private paisService: PaisService) { }

  buscar(termino: string){

    this.hayError=false;
    this.termino=termino;

    this.paisService.buscarPais(this.termino).subscribe( (paises) => {
      
      console.log(paises);
      this.paises=paises;


    }, (err) => {
      this.hayError=true;
      this.paises=[];
    });

  }

  sugerencias(termino: string){

    this.hayError=false; //hacemos que desaparezca el cuadro de error al empezar a escribir
    this.termino=termino;
    this.paisService.buscarPais(termino).subscribe( (paises) => this.paisesSugeridos = paises.splice(0,3), (err)=> this.paisesSugeridos=[] )
    this.mostrarSugerencias=true;
    
  }

  buscarSugerido(termino: string){ 
    this.buscar(termino);
  }
}
