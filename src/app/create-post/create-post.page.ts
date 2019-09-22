import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {AngularFireStorage}from 'angularfire2/storage';
import {AngularFireDatabase}from 'angularfire2/database';
import {Storage} from '@ionic/storage';
import {Camera} from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {

  contentImg;
  download;
  pictureRef;
  picname: string = "";
  imageURI: string = "";
  tmpimgurl:any;
  public keyforpost;
  public userid:string;
  category:string='';
  titleInput:string='';
  contentInput:string='';
  
  regisTxt={
    userid:'',
    category:'',
    title:'',
    content:'',
    img:''
  };

  constructor(
    public stor:Storage,
    private alertCtrl:AlertController,
    public db:AngularFireDatabase,
    public st:AngularFireStorage,
    public router:Router,
    private camera:Camera
  ) { 
    this.stor.get('id').then((val)=>{
      this.userid=val;
    });
    console.log(this.userid);
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
  
  register(){
    if(!this.userid){
      this.alertCtrl.create({
        header:'',
        message: '로그인 후 이용해주세요',
        buttons:[{
          text:'확인',
          role: 'cancel'
        }]
      }).then(alertEI=>{
        alertEI.present();
      });
      this.router.navigateByUrl('login');
    }
    if(this.titleInput===''||this.contentInput===''||this.category===''){
      this.alertCtrl.create({
        header: '',
        message: '내용을 전부 입력해주세요',
        buttons: [{
          text: '확인',
          role: 'cancel'
        }]
      }).then(alertEI=>{
        alertEI.present();
      });
      return 0;
    }else{
      this.regisTxt.userid= this.userid;
      this.regisTxt.category=this.category;
      this.regisTxt.title=this.titleInput;
      this.regisTxt.content=this.contentInput;
      this.regisTxt.img=this.picname;
      alert('글이 등록되었습니다.');
      this.keyforpost = new Date().getTime();
      this.db.object(`regisTxt/${this.keyforpost}`).set(this.regisTxt);
      // tslint:disable-next-line:max-line-length
      if (this.regisTxt.img !== '') {
        this.showImage();
      }
      // this.router.navigate(['post',this.titleInput]);
      this.router.navigateByUrl('/tabs/tab2');
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
            this.db.object(`regisTxt/${this.keyforpost}/img`).set(this.tmpimgurl);
          });
        }
}
