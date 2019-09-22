import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public userid: string = null;
  public userauth: string = null;
  constructor(
    public plat: Platform,
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public router: Router,
    public atrCtrl: AlertController,
    public stor: Storage
    ) {}
    ionViewWillEnter() {
      this.stor.get('id').then((val) => {
        this.userid = val;
        console.log(val);
      });
      this.stor.get('auth').then((val) => {
        this.userauth = val;
        console.log(val);
      });
    }
    async atrLout() {
      const alert = await this.atrCtrl.create({
        header: '확인',
        message: '로그아웃되었습니다',
        buttons: [
          {
            text: 'Okay',
            role: 'cancel',
            handler: (blah) => {
              console.log('logout');
              this.router.navigateByUrl('/tabs/tab1');
            }
          }
        ]
      });
      await alert.present();
    }
    logout() {
      this.userid = null;
      this.stor.set('id', null);
      // tslint:disable-next-line:only-arrow-functions
      firebase.auth().signOut().then(function() { // 채팅 못하도록 함
        console.log('Sign-out successful');
      });
      this.router.navigateByUrl('tabs/tab1');
      this.atrLout();
    }

    checkInform() {
      this.router.navigateByUrl('cinform');
    }
    goInform() {
      this.router.navigateByUrl('inform');
    }
    goMap() {
      this.router.navigateByUrl('hospital');
    }
    goDevelop(){
      this.router.navigateByUrl('re-develop');
    }
    goProgress(){
      this.router.navigateByUrl('progress');
    }
}
