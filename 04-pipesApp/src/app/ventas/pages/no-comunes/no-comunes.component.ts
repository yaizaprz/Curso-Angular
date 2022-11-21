import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-no-comunes',
  templateUrl: './no-comunes.component.html',
  styles: [
  ]
})
export class NoComunesComponent  {


  //i18nSelect
  nombre: string = 'Fernando';
  genero: string='masculino';
  invitacionMapa = {
    'masculino': 'invitarlo',
    'femenino': 'invitarla'
  };

  //i18nPlural
  clientes: string[]= ['Maria','Pedro','Hernando','Eduardo','Fernando'];
  clientesMapa={
    '=0':'no tenemos ningún cliente esperando.',
    '=1':'tenemos un cliente esperando.',
    '=2':'tenemos 2 clientes esperando',
    'other':'tenemos # clientes esperando.'
  };


  cambiarCliente(){ 
    this.nombre="Yaiza";
    this.genero="femenino"
  }

  borrarCliente(){ 
    this.clientes.shift();
  }

  
  //KeyValue Pipe
  persona={
    nombre:'Fernando',
    edad:35,
    direccion:'Ottawa, Canadá'
  }


  //Json Pipe
  heroes=[
    {
      nombre: 'Superman',
      vuela: true
    },
    {
      nombre:'Robin',
      vuela:false
    }, 
    {
      nombre:'Aquaman',
      vuela:false
    }
  ]


  //Async pipe
  miObservable = interval(5000);

  valorPromesa=new Promise( (resolve, reject)=> { 
    setTimeout(()=>{
      resolve('Tenemos data de promesa');
    },3500);
  } );

}
