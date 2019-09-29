import { Component } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore } from '@angular/fire/firestore';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  chattingRef: any;
  ID: string;
  you: string;
  public check=false;
  constructor(
    public fs: AngularFirestore,
    public af: AngularFireAuth,
    public nav: NavController,
    public router: Router,
    public stor: Storage,
    public atrCtrl: AlertController,
    public db: AngularFireDatabase
    ) {
      // this.Email=this.af.auth.currentUser.email,
      this.stor.get('id').then((val) => {
        this.ID = val;
      });
      this.chattingRef = this.fs.collection('chatting', ref => ref.orderBy('Timestamp')).valueChanges();
      const DB=firebase.firestore();
      const collection = DB.collection('chatting');

      collection.get().then(snapshot=>{
        snapshot.forEach(doc=>{
          const get1=doc.data().uid1;
          const get2=doc.data().uid2;
          console.log(get1+"    "+get2);
          if((this.ID === get1)||(this.ID===get2)){
            this.check=true;
          }
          console.log("체크"+this.check);
        });
      });
      console.log("없음");
  }

  ionViewWillEnter() {
    this.stor.get('id').then((val) => {
      this.ID = val;
    });
  }
  ngOnInit(){
    
  }
  openChat(you: string) {
    this.you = you;
    this.router.navigate(['chat-view', this.you]);
  }
}
