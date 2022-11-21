//esto es validar que no se pueda mandar el formulario si no estan bien todos los campos, en realidad no hace falta pero en el curso es usado para introducir las directivas
//personalizadas, asi que queda implementado (pero creo que solo para la parte de existencias)

import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';



@Directive({
  selector: '[customMin] [ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CustomMinDirective,
    multi: true
  }]
})

export class CustomMinDirective implements Validator{
  @Input() minimo!: number;

  constructor(){
  }

  validate( control: FormControl ) {
      const inputValue = control.value;
      return (inputValue < this.minimo)
              ?{'customMin':true}
              : null;
  }
}