import { Component, OnInit } from '@angular/core';
import {NavController, AlertController} from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router , ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { from, VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-showinform',
  templateUrl: './showinform.page.html',
  styleUrls: ['./showinform.page.scss'],
})
export class ShowinformPage implements OnInit {
  public userauth: string = null;
// 글 보여주기 위한 변수들
temp: any;
public item: any;
code: string;
headert: string;
public itemtmp: any;
writer: string;
temp_content: number;
temp_complete: number;
temp_Gucomplete: number;
temp_GU: string;
GU: any;
GUU:number;
comment: string;
text: string;
temp_com: number = 0;
i = 0;
j =0;
test_GU:string;
constructor(
  public navCtrl: NavController,
  public atrCtrl: AlertController,
  public db: AngularFireDatabase,
  public fs: AngularFirestore,
  public af: AngularFireAuth,
  public router: Router,
  public stor: Storage,
  public activatedRoute: ActivatedRoute
) {
  this.stor.get('auth').then((val) => {
        this.userauth = val;
      });
 }
 ngOnInit() {
  this.code = this.activatedRoute.snapshot.paramMap.get('code');
  this.writer = this.activatedRoute.snapshot.paramMap.get('writer');
  firebase.database().ref().once('value').then((snapshot) => {
    // tslint:disable-next-line: prefer-const
        let c = snapshot.child(`informTxt/${this.code}/complete`).val();
        this.temp_complete = c;
        let co = snapshot.child(`informTxt/${this.code}/comment`).val();
        this.comment = co;
        let a = snapshot.child(`informTxt/${this.code}/gu`).val();
        this.temp_GU = a;
        console.log(this.temp_GU);
  });
  this.load();
}
async done() {
  if(this.comment == null || this.comment === '') {
    this.comment = '작성한 답변이 없습니다.';
  }
  firebase.database().ref().once('value').then((snapshot) => {
    // tslint:disable-next-line: triple-equals
    this.db.object(`informTxt/${this.code}/complete`).set(1);   // 확인 완료 버튼 누르면 complete가 1 되게
    this.db.object(`informTxt/${this.code}/comment`).set(this.comment);
    let c = snapshot.child(`seoulGu/completeNum`).val();
    this.temp_complete = c;
    this.temp_complete = this.temp_complete + 1;
    this.db.object(`seoulGu/completeNum`).set(this.temp_complete);
  });

  firebase.database().ref().once('value').then((snapshot) => {
      for (this.i = 0; this.i < 25; this.i++) {
        let g = snapshot.child(`seoulGu/${this.i}/guName`).val();
        this.test_GU = g;

        if(this.test_GU === this.temp_GU) 
        {
          this.j = this.i
          let c = snapshot.child(`seoulGu/${this.j}/GuComplete`).val();
          this.temp_complete = c;
          this.temp_complete = this.temp_complete + 1;
          this.db.object(`seoulGu/${this.j}/GuComplete`).set(this.temp_complete);
        }
      }
  });

  this.atrCtrl.create({
    header: '알림',
    message: '확인 완료 되었습니다.',
    buttons: [{
      text: '확인',
      role: 'cancel'
    }]
  }).then(alertEl => {
    alertEl.present();
  });

  this.router.navigateByUrl('cinform');
}
cancel() {
  firebase.database().ref().once('value').then((snapshot) => {
    this.db.object(`informTxt/${this.code}/complete`).set(0);   // 확인 취소 버튼 누르면 complete가 1 되게
    this.db.object(`informTxt/${this.code}/comment`).set('');
    let c = snapshot.child(`seoulGu/completeNum`).val();
    this.temp_complete = c;
    this.temp_complete = this.temp_complete - 1;
    this.db.object(`seoulGu/completeNum`).set(this.temp_complete);
  });
  firebase.database().ref().once('value').then((snapshot) => {
    for (this.i = 0; this.i < 25; this.i++) {
      let g = snapshot.child(`seoulGu/${this.i}/guName`).val();
      this.test_GU = g;

      if(this.test_GU === this.temp_GU) 
      {
        this.j = this.i
        let c = snapshot.child(`seoulGu/${this.j}/GuComplete`).val();
        this.temp_complete = c;
        this.temp_complete = this.temp_complete - 1;
        this.db.object(`seoulGu/${this.j}/GuComplete`).set(this.temp_complete);
      }
    }
});
  this.atrCtrl.create({
    header: '알림',
    message: '확인 취소 되었습니다.',
    buttons: [{
      text: '확인',
      role: 'cancel'
    }]
  }).then(alertEl => {
    alertEl.present();
  });
  this.comment = null;
  this.router.navigateByUrl('cinform');
}
/* 제보 취소 */
cancel2() {
    firebase.database().ref().once('value').then((snapshot) => {
      // tslint:disable-next-line: prefer-const
      this.db.object(`informTxt/${this.code}`).set(null);
    });
    this.atrCtrl.create({
      header: '알림',
      message: '삭제 되었습니다.',
      buttons: [{
        text: '확인',
        role: 'cancel'
      }]
    }).then(alertEl => {
      alertEl.present();
    });
    this.router.navigateByUrl('cinform');
  }
load() {
  this.db.list('informTxt/', ref => ref.orderByChild('code').equalTo(this.code)).valueChanges().subscribe(
    data => {
      if (data.length !== 1) { return; } // TODO: Error exception
      this.item = data;
      this.itemtmp = data[0];
      this.headert = this.itemtmp.category;
      
     // this.temp_code = data[0].code;
      this.db.list('userInfo/', ref => ref.orderByChild('userid').equalTo(this.writer)).valueChanges().subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        data => {
          if (data.length !== 1) { return; } // TODO: Error exception
          let writerimg;
          writerimg = data[0];
          document.getElementById('writerimg').setAttribute('src', writerimg.userpic);
      });
  });
}

}
