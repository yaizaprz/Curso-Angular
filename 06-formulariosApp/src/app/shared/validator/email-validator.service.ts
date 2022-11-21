import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator{

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    
    const email = control.value;
    console.log(email);
    return this.http.get<any[]>(`http://localhost:3000/usuarios?q=${email}`).pipe(
              //delay(3000),  //esto es para que antes de tener la respuesta del map este servicio se demore 3 segundos
              map( resp => {
                      return (resp.length === 0)
                              ? null //devuelve un array vacio, por lo que el correo es valido porque no se ha registrado antes
                              : { emailTomado: true }
                  } )
            );

  }

}
