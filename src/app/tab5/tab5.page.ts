import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

interface User {
  email?: string;
  password?: string;
}
@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})

export class Tab5Page implements OnInit {
  public userid: string = null;
user: User = {
  email: '',
  password: ''
};
  // tslint:disable-next-line:no-inferrable-types
  username: string = '';
  // tslint:disable-next-line:no-inferrable-types
  password: string = '';
  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    public router: Router,
    public db: AngularFireDatabase,
    public stor: Storage
    ) { }

  ngOnInit() {
  }
  async login() {
    // tslint:disable-next-line:prefer-const
    let userid;
    const { username, password } = this;
    try {
        const rootRef = firebase.database().ref();
        const user = await this.afAuth.auth.signInWithEmailAndPassword(username, password);
        this.user.email = username;
        this.user.password = password;
        const temp = username.split('.');
        // tslint:disable-next-line:only-arrow-functions
        rootRef.child('userInfo').child(`${temp[0]}/userid`).once('value', function(data) {
          userid = data.val();
        }).then( result => {
          this.stor.set('id', result.val());
        });
        this.alertCtrl.create({
          header: '',
          message: '로그인되었습니다',
          buttons: [{
            text: '확인',
            role: 'cancel'
          }]
        }).then(alertEl => {
          alertEl.present();
        });
        //this.router.navigateByUrl('tabs/tab1');
      } catch (err) {
      this.alertCtrl.create({
        header: '',
        message: '빈곳을 확인해주세요',
        buttons: [{
          text: '확인',
          role: 'cancel'
        }]
      }).then(alertEl => {
        alertEl.present();
      });
    }
  }
  async atrLout() {
    const alert = await this.alertCtrl.create({
      header: '확인',
      message: '로그아웃되었습니다',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          handler: (blah) => {
            console.log('logout');
           // this.router.navigateByUrl('/tabs/tab1');
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
    //this.router.navigateByUrl('tabs/tab1');
    this.atrLout();
  }
}
