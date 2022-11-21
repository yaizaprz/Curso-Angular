import { Component } from '@angular/core';
import { Feature } from '../../interfaces/places';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  public selectedId: string = '';

  constructor(private placesService: PlacesService, private mapService: MapService) { }

  get isLoadingPlaces(): boolean{
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[]{
    return this.placesService.places;
  }

  flyto( place: Feature ){
    this.selectedId=place.id;
    const[ lng, lat ] = place.center;
    this.mapService.flyTo([lng, lat]);

  }

  getDirections(place: Feature){
    if(!this.placesService.useLocation) throw Error ('No hay useLocation');

    this.placesService.deletePlaces();
    const start = this.placesService.useLocation;
    const end = place.center as [number, number]; //esto es que lo coja y lo trate como tipo [number, number]

    this.mapService.getRouteBetweenPoints(start, end)
  }

}
