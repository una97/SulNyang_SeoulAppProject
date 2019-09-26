import { Component, OnInit } from '@angular/core';
import {NavController, AlertController} from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router , ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { from } from 'rxjs';
@Component({
  selector: 'app-showinform',
  templateUrl: './showinform.page.html',
  styleUrls: ['./showinform.page.scss'],
})
export class ShowinformPage implements OnInit {
// 글 보여주기 위한 변수들
temp: any;
public item: any;
code: string;
headert: string;
public itemtmp: any;
writer: string;

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
 }
 ngOnInit() {
  this.code = this.activatedRoute.snapshot.paramMap.get('code');
  this.writer = this.activatedRoute.snapshot.paramMap.get('writer');
  this.load();
}

load() {
  this.db.list('informTxt/', ref => ref.orderByChild('code').equalTo(this.code)).valueChanges().subscribe(
    data => {
      if (data.length !== 1) { return; } // TODO: Error exception
      this.item = data;
      this.itemtmp = data[0];
      this.headert = this.itemtmp.category;
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
