import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import {Tab1Page} from '../tab1/tab1.page';
//import { Tab1Page } from '../tab1/tab1.module';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit {
  i = 0; j = 0;
  // 처리한 건수/ 처리해야할 건수
 public tempDoughnutData: number[] = [0, 0];
 // 학대, 사고, 길, 기타
 public tempClassification: any[] = [ {data: [0, 0, 0, 0], label: 'no'} ];
 // tslint:disable-next-line: variable-name
 public temp_completeNum = 0;
 // tslint:disable-next-line: variable-name
 public temp_wholeNum = 0;
 public temp_wabuse = 0;
 public temp_waccident = 0;
 public temp_wcat =0;
 public temp_wother =0;
 public fr = 0;
 public temp_guName: string;
 informGu:string = '';
  constructor(
    public db: AngularFireDatabase
) {}

  public doughnutChartLabels: string[] = ['처리 건수', '미처리 건수'];
  public doughnutChartType = 'doughnut';

  public labels: string[] = ['힉대', '사고', '길고양이', '기타'];
  public chartType = 'bar';

   ngOnInit() {
     /*처리할 건수 처리해야할 건수 firebase에서 데이터 읽어오기*/
    firebase.database().ref().once('value').then((snapshot) => {
      // tslint:disable-next-line: prefer-const
          let c = snapshot.child('seoulGu/completeNum').val();  //전체 제보 처리 완료 수
          this.temp_completeNum = c;
          console.log(this.temp_completeNum);
      // tslint:disable-next-line: prefer-const
          let k = snapshot.child(`seoulGu/wholeNum`).val(); // 전체 제보 받은 수
          this.temp_wholeNum = k;
          console.log(this.temp_wholeNum);
          this.tempDoughnutData = [this.temp_completeNum, this.temp_wholeNum - this.temp_completeNum];

          this.fr = this.temp_completeNum / this.temp_wholeNum * 100;
          // tslint:disable-next-line: triple-equals
          // tslint:disable-next-line: use-isnan
          if (this.fr === NaN) {
              this.fr = 0;
          }

          let a = snapshot.child(`seoulGu/wabuse`).val(); // 전체 학대 받는 고양이 수
          this.temp_wabuse = a;
          console.log(this.temp_wabuse);

          let b = snapshot.child(`seoulGu/waccident`).val(); // 전체 사고 고양이 수
          this.temp_waccident = b;
          console.log(this.temp_waccident);

          let d = snapshot.child(`seoulGu/wcat`).val(); // 전체 길고양이? 고양이 수
          this.temp_wcat = d;
          console.log(this.temp_wcat);

          let e = snapshot.child(`seoulGu/wother`).val(); // 전체 기타 고양이 수
          this.temp_wother = e;
          console.log(this.temp_wother);

          this.tempClassification = [{data: [this.temp_wabuse, this.temp_waccident, this.temp_wcat, this.temp_wother], label: '제보수'}];
    });
  }
  register() {
    firebase.database().ref().once('value').then((snapshot) => {
      // tslint:disable-next-line: prefer-const
      if ( this.informGu === '서울 전체') {
        let c = snapshot.child('seoulGu/completeNum').val();  //전체 제보 처리 완료 수
        this.temp_completeNum = c;
      // tslint:disable-next-line: prefer-const
        let k = snapshot.child(`seoulGu/wholeNum`).val(); // 전체 제보 받은 수
        this.temp_wholeNum = k;

        let a = snapshot.child(`seoulGu/wabuse`).val(); // 전체 학대 받는 고양이 수
        this.temp_wabuse = a;
        console.log(this.temp_wabuse);

        let b = snapshot.child(`seoulGu/waccident`).val(); // 전체 사고 고양이 수
        this.temp_waccident = b;
        console.log(this.temp_waccident);

        let d = snapshot.child(`seoulGu/wcat`).val(); // 전체 길고양이? 고양이 수
        this.temp_wcat = d;
        console.log(this.temp_wcat);

        let e = snapshot.child(`seoulGu/wother`).val(); // 전체 기타 고양이 수
        this.temp_wother = e;
        console.log(this.temp_wother);

        this.fr = this.temp_completeNum / this.temp_wholeNum * 100;
        this.tempDoughnutData = [this.temp_completeNum, this.temp_wholeNum - this.temp_completeNum];
        this.tempClassification = [{data: [this.temp_wabuse, this.temp_waccident, this.temp_wcat, this.temp_wother], label: '제보수'}];
      } else {
      for (this.i = 0; this.i < 25; this.i++) {

          let c = snapshot.child(`seoulGu/${this.i}/guName`).val();  // 구 이름
          this.temp_guName = c;

          if(this.temp_guName === this.informGu) { // 선택한 구의 정보 찾기
            this.j = this.i;
            let a = snapshot.child(`seoulGu/${this.j}/abuse`).val(); // 해당 구 학대 받는 고양이 수
            this.temp_wabuse = a;

            let b = snapshot.child(`seoulGu/${this.j}/accident`).val(); // 해당 구 사고 고양이 수
            this.temp_waccident = b;

            let d = snapshot.child(`seoulGu/${this.j}/cat`).val(); //  해당 구 길고양이? 고양이 수
            this.temp_wcat = a;

            let e = snapshot.child(`seoulGu/${this.j}/other`).val(); // 해당 구 기타 고양이 수
            this.temp_wother = a;

            /* 구 별 처리건수*/
            let s = snapshot.child(`seoulGu/${this.j}/GuComplete`).val();  //구별 제보 처리 완료 수
            this.temp_completeNum = s;
    
           // tslint:disable-next-line: prefer-const
            let k = snapshot.child(`seoulGu/${this.j}/informNum`).val(); // 구별 제보 받은 수
            this.temp_wholeNum = k;

            this.fr = this.temp_completeNum / this.temp_wholeNum * 100;
            this.tempDoughnutData = [this.temp_completeNum, this.temp_wholeNum - this.temp_completeNum];
            this.tempClassification = [{data: [this.temp_wabuse, this.temp_waccident, this.temp_wcat, this.temp_wother], label: '제보수'}];
            break;
          }
      }
    }
  });
  }

}

