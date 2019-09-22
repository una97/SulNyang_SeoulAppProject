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

  public labels: string[] = ['길고양이', '힉대', '사고', '기타'];
  public chartData: number[] = [20, 15, 40, 25, 0];
  public chartType = 'bar';

  public labels2: string[] = ['1월 ', '2월', '3월', '4월', '5월', '6월', '7월','8월', '9월', '10월', '11월', '12월'];
  public chartData2: number[] = [20, 15, 40, 25, 100, 20, 30, 60, 70, 80, 50, 12, 0];
  public chartType2 = 'line';
   ngOnInit() {
  }

}
