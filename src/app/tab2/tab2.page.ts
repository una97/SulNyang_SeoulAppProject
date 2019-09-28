import { Component, OnInit, ViewChild } from '@angular/core';
import {Storage} from '@ionic/storage';
import { Platform} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { NavController } from '@ionic/angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { userInfo } from 'os';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
public code: string;
public writer: string;
public items=[];
public writerInfo=[];
// public writerGu=[];
// public writerDong=[];
segment:string;
  constructor( 
    public router: Router,
    public navCtrl: NavController,
    public plat:Platform,
    public stor:Storage,
    public activatedRoute:ActivatedRoute,
    public db:AngularFireDatabase
  ) {
    // for(let i=0;i<this.items.length;i++){
    //   this.db.list('userInfo/',ref=>ref.orderByChild('userid/').equalTo(this.items[i].userid)).valueChanges().subscribe(
    //     data=>{
    //       this.writerInfo[i]=data[0];
    //       this.writerGu[i]=this.writerInfo[i].usergu;
    //       this.writerDong[i]=this.writerInfo[i].userdong;
    //     }
    //   );
    // }
  }
  ngOnInit(){
    this.segment='help';
   
    this.loadList();

  }

  segmentChanged(event){
    this.segment=event.detail.value;
    this.loadList();
  }
  loadList(){
    this.db.list('regisTxt/',ref=>ref.orderByChild('category/').equalTo(this.segment)).valueChanges().subscribe(
      data=>{
        this.items=data;
      });
  }

  goCreatePost() {
    this.router.navigate(['create-post']);
  }
  getPost(item: any) {
    this.code = item.code;
    this.writer = item.userid;
    this.router.navigate(['post', this.code, this.writer]);
  }

}
