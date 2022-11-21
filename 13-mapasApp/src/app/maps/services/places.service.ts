import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api';
import { Feature, PlacesResponse } from '../interfaces/places';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature []=[];
  
  get isUserLocationReady(): boolean {
    return !!this.useLocation;  //doble !! porque con una es que no hay un valor, y la otra es no hay un valor y lo niego, si existe eso va a ser un true
  }

  constructor(private placesApi: PlacesApiClient, private mapService: MapService) {
    this.getUserLocation();
   }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise ( (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          ({coords}) =>{ 
            this.useLocation = [coords.longitude, coords.latitude ];
            resolve( this.useLocation );
          },
          (err) => {
            alert('No se pudo obtener la geolocalizacion');
            console.error( err );
            reject();
          }
        );
    });
  }

  getPlacesByQuery (query: string = ''){

    if(query.length === 0){
      this.isLoadingPlaces=false;
      this.places=[];
      return;
    }

    if(!this.useLocation) throw Error ('No hay useLocation');

    this.isLoadingPlaces=true;
    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.useLocation.join(',')
      }
    })
    .subscribe( resp => {
      this.isLoadingPlaces=false;
      this.places=resp.features;
      this.mapService.createMarkersFromPlaces(this.places, this.useLocation!);
    } );
  }


  deletePlaces(){
    this.places=[];
  }

}
