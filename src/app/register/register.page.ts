import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  username: string = '';
  // tslint:disable-next-line:no-inferrable-types
  password: string = '';
  // tslint:disable-next-line:no-inferrable-types
  cpassword: string = '';

  userid: string;
  usergu: string;
  userdong: string;
  // tslint:disable-next-line:max-line-length
  userpic = 'https://firebasestorage.googleapis.com/v0/b/sulnyang.appspot.com/o/userpic%2FKakaoTalk_20190927_163422437.png?alt=media&token=d3973554-afdc-403e-ad53-53f65f1e4022';
  userauth: string;

  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    public db: AngularFireDatabase,
    public stor: Storage
    ) { }
  ngOnInit() {
  }
  async register() {
    const { username, password, cpassword, userid, usergu, userdong } = this;
    if (password !== cpassword) {
      return this.alertCtrl.create({
        header: '',
        message: '비밀번호가 다릅니다',
        buttons: [{
          text: '확인',
          role: 'cancel'
        }]
      }).then(alertEl => {
        alertEl.present();
      });
    }
    if (username === '' || password === '' || userid === '') {
      this.alertCtrl.create({
        header: '',
        message: '빈칸이 없는지 확인해주세요',
        buttons: [{
          text: '확인',
          role: 'cancel'
        }]
      }).then(alertEl => {
        alertEl.present();
      });
      return;
    }
    // tslint:disable-next-line:prefer-const
    let strArray = this.username.split('.');
    this.db.object(`userInfo/${strArray[0]}/userid`).set(this.userid);
    this.db.object(`userInfo/${strArray[0]}/usergu`).set(this.usergu);
    this.db.object(`userInfo/${strArray[0]}/userdong`).set(this.userdong);
    // tslint:disable-next-line:max-line-length
    this.db.object(`userInfo/${strArray[0]}/userpic`).set(this.userpic);
    this.db.object(`userInfo/${strArray[0]}/userauth`).set(this.userauth);
    try {
      const res =  this.afAuth.auth.createUserWithEmailAndPassword(username, password);
      this.navCtrl.navigateBack('/tabs/tab1');
  } catch (error) {
    }
  }
}
