import { Component, OnInit } from '@angular/core';
import { GraficasService } from '../../services/graficas.service';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona-http',
  templateUrl: './dona-http.component.html',
  styles: [
  ]
})
export class DonaHttpComponent implements OnInit {

  
  public doughnutChartLabels: string[] = [ /*'Download Sales', 'In-Store Sales', 'Mail-Order Sales', 'Others' */];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
     /* { 
        data: [ /*350, 450, 100, 150],
        /*backgroundColor: [/*'#0075ED',
        '#00BAF7',
        '#00E0DB',
        '#00F7AD',
      '#00ED63']
      }*/
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';
  

  constructor(private graficasService: GraficasService  ) { }

  ngOnInit(): void {
  /*  this.graficasService.getUsuariosRedesSociales().subscribe(data => { 
      console.log(data); 
      const labels = Object.keys(data);
      const values = Object.values(data);


      labels.forEach ( label => {
        this.doughnutChartLabels.push (label);
      });
      this.doughnutChartData.datasets.push ( {
        data                : values,
       backgroundColor     : ['#0075ED',
       '#00BAF7',
       '#00E0DB',
       '#00F7AD',
     '#00ED63']
      });
    });*/ //ESTO ES COMO SE HIZO ANTES DE CAMBIAR Y HACERLO EN EL SERVICE

    this.graficasService.getUsuariosRedesSocialesDonaData().subscribe(({labels, values}) => {
      //this.doughnutChartLabels = labels;
      labels.forEach ( label => {
        this.doughnutChartLabels.push (label);
      });
      this.doughnutChartData.datasets.push({
        data: values
      });
     })
  }

}
