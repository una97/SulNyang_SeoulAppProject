import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit {

  constructor() { }

  public doughnutChartLabels: string[] = ['처리한 건수', '처리해야할 건수'];
  public doughnutChartData: number[] = [1200, 2000];
  public doughnutChartType = 'doughnut';

  ngOnInit() {
  }

}
