import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: any; //esto lo creó solo y sin el el archivo de test da error no se por que

  nombre: string='ferNando herRera';
  valor: number = 1000;
  obj = {
    nombre:'Fernando'
  };
  

  mostrarNombre(){
    console.log(this.nombre);
    console.log(this.valor);
    console.log(this.obj);
  }

  constructor(private primengConfig: PrimeNGConfig){}

  ngOnInit(){ 
    this.primengConfig.ripple = true;
  }

}
