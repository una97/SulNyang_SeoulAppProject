import { Component } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore } from '@angular/fire/firestore';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  chattingRef: any;
  ID: string;
  you: string;
  constructor(
    public fs: AngularFirestore,
    public af: AngularFireAuth,
    public nav: NavController,
    public router: Router,
    public stor: Storage,
    public atrCtrl: AlertController
    ) {
      // this.Email=this.af.auth.currentUser.email,
      this.stor.get('id').then((val) => {
        this.ID = val;
      });
      this.chattingRef = this.fs.collection('chatting', ref => ref.orderBy('Timestamp')).valueChanges();
  }
  ionViewWillEnter() {
    this.stor.get('id').then((val) => {
      this.ID = val;
    });
  }
  openChat(you: string) {
    this.you = you;
    this.router.navigate(['chat-view', this.you]);

  }
}
