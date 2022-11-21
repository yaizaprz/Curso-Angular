import { Component } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales', 'Others' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { 
        data: [ 350, 450, 100, 150 ],
        backgroundColor: ['#0075ED',
        '#00BAF7',
        '#00E0DB',
        '#00F7AD',
        '#00ED63']
      }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';
  
}
