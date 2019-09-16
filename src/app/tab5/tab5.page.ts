import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import {AngularFireStorage}from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import {Camera} from '@ionic-native/camera/ngx';

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
  picname: string = "";
  imageURI: string = "";
  tmpimgurl:any;
  public useremail: string = null;
  public keyforpost;
  public userid: string = null;
  // tslint:disable-next-line:max-line-length
  public userpic = '';
user: User = {
  email: '',
  password: '',
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
    public stor: Storage,
    public st: AngularFireStorage,
    private camera: Camera
    ) { }

  ngOnInit() {
    let userpictmp;
    this.stor.get('id').then((val) => {
      this.userid = val;
      console.log(val);
    });
    this.stor.get('email').then((val) => {
      this.useremail = val;
      console.log(val);
      firebase.database().ref().child('userInfo').child(`${this.useremail}/userpic`).once('value', function(data) {
        userpictmp = data.val();
      }).then( result => {
        this.userpic = result.val();
      });
    });
  }
  async login() {
    // tslint:disable-next-line:prefer-const
    let useridtmp;
    const { username, password } = this;
    try {
        const rootRef = firebase.database().ref();
        const user = await this.afAuth.auth.signInWithEmailAndPassword(username, password);
        this.user.email = username;
        this.user.password = password;
        const temp = username.split('.');
        this.useremail = temp[0];
        this.stor.set('email', temp[0]);
        // tslint:disable-next-line:only-arrow-functions
        rootRef.child('userInfo').child(`${temp[0]}/userid`).once('value', function(data) {
          useridtmp = data.val();
        }).then( result => {
          this.userid = result.val();
          this.stor.set('id', result.val());
        });
        // tslint:disable-next-line:only-arrow-functions
        rootRef.child('userInfo').child(`${temp[0]}/userpic`).once('value', function(data) {
          userpictmp = data.val();
        }).then( result => {
          this.userpic = result.val();
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
    this.useremail = null;
    this.stor.set('id', null);
    this.stor.set('email', null);
    // tslint:disable-next-line:only-arrow-functions
    firebase.auth().signOut().then(function() { // 채팅 못하도록 함
      console.log('Sign-out successful');
    });
    this.atrLout();
  }
  pickPicture() {
    // tslint:disable-next-line:prefer-const
    let options = {
      quality: 100,
      targetWidth: 500,
      targetHeight: 500,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.camera.getPicture(options).then((imageURI) => {
      // tslint:disable-next-line:prefer-const
      let newName = `${new Date().getTime()}.png`;
      console.log(imageURI);
      // 이미지 미리보기
      document.getElementById('upic').setAttribute('src', 'data:image/jpeg;base64,' + imageURI);
      this.imageURI = imageURI;
      this.picname = newName;
      console.log(this.picname);
      this.st.ref(`userpic/${newName}`).putString(imageURI, 'base64', {contentType: 'image/png'}).then( value => {
        this.showImage();
      });
    });
    // alert('프로필 사진이 변경되었습니다');
  }
  showImage() {
    // tslint:disable-next-line: prefer-const
          let storageRef = firebase.storage().ref();
    // tslint:disable-next-line: prefer-const
          let imageRef = storageRef.child(`userpic/${this.picname}`);
          // console.log(imageRef.getDownloadURL());
          imageRef.getDownloadURL()
          .then((imageURI) => {
            console.log(imageURI);
            this.tmpimgurl = imageURI;
            this.db.object(`userInfo/${this.useremail}/userpic`).set(this.tmpimgurl);
          });
        }
}
