import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button{
      margin-right: 5px;
    }
  `
  ]
})
export class PorRegionComponent  {

  regiones: string[] = ['EU', 'EFTA', 'CARICOM', 'PA', 'AU','USAN','EEU','AL','ASEAN','CAIS','CEFTA','NAFTA','SAARC'];
  regionActiva: string='';
  paises: Country[] = [];


  constructor(private paisService: PaisService) {}

  getClaseCSS(region: string){
    return((region===this.regionActiva)? 
      'btn btn-primary'
      : 'btn btn-outline-primary');
  }

  activarRegion(region:string){
    if(region===this.regionActiva){return;} //hace que si volvemos a seleccionar la misma region en la que ya estamos no vuelva a ejecutar todo cargando los paises, se sale de la funcion
    this.regionActiva=region;
    this.paises=[];
    this.paisService.buscarRegion(region).subscribe( paises => this.paises = paises);

  }

}
