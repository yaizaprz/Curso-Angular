import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'Y7WRcVYVvRKoFlaVDgCHho3hvSxRXnWK';
  private servicioUrl: string='https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  public resultados: Gif []=[];

  get historial(){
   
    return [...this._historial];
  }

  constructor( private http: HttpClient ){
    
    this._historial= JSON.parse(localStorage.getItem('historial')!) || []; //cogemos el localStorage y lo devolvemos a su estado original (un array), y si es null devuelve un array vacio
    //if( localStorage.getItem('historial') ){  //esto es lo mismo que la linea de arriba
      //this._historial=JSON.parse(localStorage.getItem('historial')!);
    //}

    this.resultados=JSON.parse(localStorage.getItem('resultados')!) || [];


    
  }

  buscarGifs(query: string){

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query) ){ //comprobamos que el elemento ya existe en las ultimas busquedas o no
      this._historial.unshift(query); //no existe por lo que lo insertamos en las busquedas recientes
      this._historial=this._historial.splice(0,10); //esto corta el array principal, haciendo que sea siempre de tamaño 10, osea que se guardan solo las 10 ultimas busquedas
      
      localStorage.setItem('historial', JSON.stringify(this._historial));
      
    }

    const params= new HttpParams().set('apiKey',this.apiKey).set('limit','10').set('q',query);

    

    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params }).subscribe( (resp) =>{
      this.resultados=resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    })
    

  }
}
