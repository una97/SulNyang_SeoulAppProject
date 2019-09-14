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
  imageURI;
  tmpimgurl:any;

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
    }

  }
}
