import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {AngularFireStorage} from 'angularfire2/storage';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {Camera} from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-inform',
  templateUrl: './inform.page.html',
  styleUrls: ['./inform.page.scss'],
})
export class InformPage implements OnInit {
  public userid: string = null;
  public receiverId: string = '';
  category: string = '';
  content: string = '';
  informGu: string = '';
  informDong: string = '';
  dateInput: string = '';
  public keyforpost;
  picname: string = "";
  imageURI: string = "";
  tmpimgurl:any;
  categorytmp: string = "";
  informTxt = {
    sender: '',
    category: '',
    date: '',
    gu: '',
    dong: '',
    content: '',
    img: '',
    code: '',
    complete:0
  };
  constructor(
    public plat: Platform,
    private alertCtrl: AlertController,
    public activatedRoute: ActivatedRoute,
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    public router: Router,
    public atrCtrl: AlertController,
    public stor: Storage,
    public camera: Camera,
    public st: AngularFireStorage
  ) {
    this.stor.get('id').then((val) => {
      this.userid = val;
    });

  }

  ngOnInit() {

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
      document.getElementById('imgboard').setAttribute('src', 'data:image/jpeg;base64,' + imageURI);
      this.imageURI = imageURI;
      this.picname = newName;
      console.log(this.picname);
      this.st.ref(`picture/${newName}`).putString(imageURI, 'base64', {contentType: 'image/png'});
    }, (err) => {
      console.log('err:' + JSON.stringify(err));
    });
  }
  register() {
    if (!this.userid) {
      this.alertCtrl.create({
        header: '',
        message: '로그인 후 이용해주세요',
        buttons: [{
          text: '확인',
          role: 'cancel'
        }]
      }).then(alertEI => {
        alertEI.present();
      });
      this.router.navigateByUrl('login');
    }
    if (this.category === '' || this.informGu === '' || this.informDong === '' || this.dateInput === '' || this.content === '') {
      this.alertCtrl.create({
        header: '',
        message: '내용을 전부 입력해주세요',
        buttons: [{
          text: '확인',
          role: 'cancel'
        }]
      }).then(alertEI => {
        alertEI.present();
      });
      return 0;
    } else {
     this.plusGu();
     this.informTxt.sender = this.userid;
     this.informTxt.category = this.category;
     this.informTxt.date = this.dateInput.substring(0, 10);
     this.informTxt.gu = this.informGu;
     this.informTxt.dong = this.informDong;
     this.informTxt.content = this.content;
     this.informTxt.img = this.picname;
     // this.informTxt.receiverId="admin@naver";
     alert('글이 등록되었습니다.');
     this.keyforpost = new Date().getTime();
     this.informTxt.code = String(this.keyforpost);
     this.db.object(`informTxt/${this.keyforpost}`).set(this.informTxt);
     // tslint:disable-next-line:max-line-length
     if (this.informTxt.img !== '') {
      this.showImage();
    }
     this.router.navigateByUrl('/tabs/tab1');
    }
  }
  plusGu() {
    // tslint:disable-next-line:prefer-const
    let rootRef = firebase.database().ref();
    let tmpcount = 0;
    let tmpwhole = 0;
    let tmpwcate = 0;
    let tmpcate = 0;
    if (this.category === '학대') {
      this.categorytmp = 'abuse';
    } else if (this.category === '사고') {
      this.categorytmp = 'accident';
    } else if (this.category === '피해신고') {
      this.categorytmp = 'cat';
    } else if (this.category === '기타민원') {
      this.categorytmp = 'other';
    }
    // 카테고리별 제보글 수 더해주기
    rootRef.child(`seoulGu/w${this.categorytmp}`).once('value', function(data) {
      tmpwcate = data.val() + 1;
    }).then( val => {
      this.db.object(`seoulGu/w${this.categorytmp}`).set(tmpwcate);
    });
    // 전체 제보글 수 더해주기
    rootRef.child('seoulGu/wholeNum').once('value', function(data) {
      tmpwhole = data.val() + 1;
    }).then( val => {
      this.db.object(`seoulGu/wholeNum`).set(tmpwhole);
    });
    // 구별 제보글 수 더해주기 + 구별 카테고리
    if (this.informGu === '종로구') {
      rootRef.child('seoulGu/0/informNum').once('value', function(data) {//제보글 수
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/0/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/0/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/0/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '중구') {
      rootRef.child('seoulGu/1/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/1/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/1/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/1/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '용산구') {
      rootRef.child('seoulGu/2/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/2/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/2/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/2/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '성동구') {
      rootRef.child('seoulGu/3/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/3/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/3/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/3/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '광진구') {
      rootRef.child('seoulGu/4/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/4/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/4/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/4/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '동대문구') {
      rootRef.child('seoulGu/5/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/5/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/5/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/5/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '중랑구') {
      rootRef.child('seoulGu/6/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/6/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/6/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/6/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '성북구') {
      rootRef.child('seoulGu/7/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/7/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/7/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/7/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '강북구') {
      rootRef.child('seoulGu/8/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/8/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/8/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/8/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '도봉구') {
      rootRef.child('seoulGu/9/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/9/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/9/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/9/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '노원구') {
      rootRef.child('seoulGu/10/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/10/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/10/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/10/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '은평구') {
      rootRef.child('seoulGu/11/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/11/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/11/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/11/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '서대문구') {
      rootRef.child('seoulGu/12/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/12/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/12/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/12/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '마포구') {
      rootRef.child('seoulGu/13/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/13/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/13/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/13/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '양천구') {
      rootRef.child('seoulGu/14/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/14/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/14/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/14/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '강서구') {
      rootRef.child('seoulGu/15/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/15/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/15/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/15/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '구로구') {
      rootRef.child('seoulGu/16/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/16/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/16/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/16/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '금천구') {
      rootRef.child('seoulGu/17/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/17/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/17/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/17/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '영등포구') {
      rootRef.child('seoulGu/18/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/18/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/18/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/18/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '동작구') {
      rootRef.child('seoulGu/19/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/19/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/19/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/19/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '관악구') {
      rootRef.child('seoulGu/20/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/20/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/20/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/20/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '서초구') {
      rootRef.child('seoulGu/21/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/21/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/21/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/21/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '강남구') {
      rootRef.child('seoulGu/22/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/22/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/22/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/22/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '송파구') {
      rootRef.child('seoulGu/23/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/23/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/23/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/23/${this.categorytmp}`).set(tmpcate);
      });
    } else if (this.informGu === '강동구') {
      rootRef.child('seoulGu/24/informNum').once('value', function(data) {
        tmpcount = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/24/informNum`).set(tmpcount);
      });
      rootRef.child(`seoulGu/24/${this.categorytmp}`).once('value', function(data) {//카테고리별
        tmpcate = data.val() + 1;
      }).then( val => {
        this.db.object(`seoulGu/24/${this.categorytmp}`).set(tmpcate);
      });
    }
  }
  showImage() {
    // tslint:disable-next-line: prefer-const
          let storageRef = firebase.storage().ref();
    // tslint:disable-next-line: prefer-const
          let imageRef = storageRef.child(`picture/${this.picname}`);
          // console.log(imageRef.getDownloadURL());
          imageRef.getDownloadURL()
          .then((imageURI) => {
            console.log(imageURI);
            this.tmpimgurl = imageURI;
            this.db.object(`informTxt/${this.keyforpost}/img`).set(this.tmpimgurl);
          });
    }
}
