import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor{
  color: string;
  marker?:mapboxgl.Marker;
  centro?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
  .mapa-container{ 
      width:100%; 
      height:100%;
    }

    .list-group{
      position: fixed;
      top: 20px;
      right:20px;
      z-index:99;
    }

    li{
      cursor:pointer;
    }
  `]
})


export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-7.5159977586132385, 42.52000256294854 ];

  //array de marcadores
  marcadores: MarcadorColor[] = [];
  
  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center, //primero longitud y luego latitud (en googlemaps es al revés)
      zoom: this.zoomLevel
    });

    /*const markerHtml: HTMLElement = document.createElement('div');
    markerHtml.innerHTML='Hola mundo';*/  //esto es para personalizar el marcador, así te aparece con lo que tu pongas, hay que pasarselo al mapboxgl.Marker({element: markerHtml})

    //new mapboxgl.Marker().setLngLat(this.center).addTo(this.mapa);
    //vamos crear los marcadores de forma dinamica, por eso lo anterior queda comentado
  
    this.leerLocalStorage();

  }

  agregarMarcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const nuevoMarcador = new mapboxgl.Marker({draggable: true, color}).setLngLat(this.center).addTo(this.mapa);

    this.marcadores.push({
      color, marker: nuevoMarcador
    });

    this.guardarMarcadoresLocalStorage();

    nuevoMarcador.on('dragend', () =>{ //cuando se deja de arrastrar el marcador
      this.guardarMarcadoresLocalStorage();
    })

  }

  irMarcador(marker: mapboxgl.Marker){
    this.mapa.flyTo({
      center: marker.getLngLat()
    });

  }

  guardarMarcadoresLocalStorage(){
    const lngLatArr: MarcadorColor [] = [];

    this.marcadores.forEach( m => {
      const color = m.color;
      const {lng, lat} = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [lng, lat]
      });
    })

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  leerLocalStorage(){
    if(!localStorage.getItem('marcadores')){ return;} //no hay marcadores

    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);
    lngLatArr.forEach( m => {
        const newMarker = new mapboxgl.Marker({
            color: m.color,
            draggable: true
        }).setLngLat ( m.centro! ).addTo(this.mapa);
        
        this.marcadores.push({
            marker: newMarker,
            color: m.color
        });

        newMarker.on('dragend', () =>{ //cuando se deja de arrastrar el marcador
          this.guardarMarcadoresLocalStorage();
        })
    });
  }

  borrarMarcador(i: number){
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i,1);
    this.guardarMarcadoresLocalStorage();
  }

}
