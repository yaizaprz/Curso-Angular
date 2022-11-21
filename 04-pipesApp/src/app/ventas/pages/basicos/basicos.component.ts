import { Component } from '@angular/core';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent  {
  
  nombreLower: string = 'yaiza';
  nombreUpper: string ='YAIZA';
  nombreCompleto: string= 'yaIzA pErEz'

  fecha: Date = new Date();//el dia de hoy

}
