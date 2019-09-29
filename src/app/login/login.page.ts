import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
        const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password);
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
        this.router.navigateByUrl('tabs/tab1');
      } catch (err) {
      this.alertCtrl.create({
        header: '',
        message: '아이디나 비밀번호가 틀렸습니다.',
        buttons: [{
          text: '확인',
          role: 'cancel'
        }]
      }).then(alertEl => {
        alertEl.present();
      });
    }
  }
}
