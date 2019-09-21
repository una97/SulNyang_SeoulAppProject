import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {AngularFireDatabase}from 'angularfire2/database';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-inform',
  templateUrl: './inform.page.html',
  styleUrls: ['./inform.page.scss'],
})
export class InformPage implements OnInit {
  public userid: string = null;
  public receiverId:string="";
  category:string='';
  content:string='';
  informGu:string='';
  informDong:string='';
  dateInput:string='';
  public keyforpost;


  informTxt={
    sender:'',
    category:'',
    date:'',
    gu:'',
    dong:'',
    content:'',
    receiverId:'',
  }
  constructor(
    public plat: Platform,
    private alertCtrl:AlertController,
    public activatedRoute: ActivatedRoute,
    public db:AngularFireDatabase,
    public navCtrl: NavController,
    public router: Router,
    public atrCtrl: AlertController,
    public stor: Storage
  ) { 
    this.stor.get('id').then((val) => {
      this.userid = val;
    });

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
    if(this.category===''||this.informGu===''||this.informDong===''||this.dateInput===''){
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
    }
    else{
     this.informTxt.sender=this.userid;
     this.informTxt.category=this.category;
     this.informTxt.date=this.dateInput.substring(0,10);
     this.informTxt.gu=this.informGu;
     this.informTxt.dong=this.informDong;
     this.informTxt.content=this.content;
     this.informTxt.receiverId="admin@naver";
      alert('글이 등록되었습니다.');     
      this.keyforpost = new Date().getTime();
      this.db.object(`informTxt/${this.keyforpost}`).set(this.informTxt);
     this.router.navigateByUrl('/tabs/tab1');

    }
  }

}
