import { Component, OnInit } from '@angular/core';
import {NavController, AlertController} from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router , ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { from } from 'rxjs';
@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
// 글 보여주기 위한 변수들
  temp: any;
  public item: any;
  title: string;


// 채팅에 필요한 변수들
  check = false;
  chattingRef: any;
  getuid1: string;
  getuid2: string;
  size: number;
  index: number;
  first = true;
  getSize: any;
  currentU: string;
  constructor(
    public navCtrl: NavController,
    public atrCtrl: AlertController,
    public db: AngularFireDatabase,
    public fs: AngularFirestore,
    public af: AngularFireAuth,
    public router: Router,
    public stor: Storage,
    public activatedRoute: ActivatedRoute
  ) {
   }

   ngOnInit() {
    this.title = this.activatedRoute.snapshot.paramMap.get('title');
    this.load();
    this.stor.get('id').then((val) => {
      this.currentU = val;
    });
  }

  load() {
    this.db.list('regisTxt/', ref => ref.orderByChild('title').equalTo(this.title)).valueChanges().subscribe(
      data => {
        if (data.length !== 1) { return; } // TODO: Error exception
        this.item = data[0];
    });
    console.log(this.item);
  }
  async chat2Me() {
    const alert2 = await this.atrCtrl.create({
      header: '경고!',
      message: '본인이 작성한 게시글입니다',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          handler: (blah) => {
            console.log('나랑 채팅');
          }
        }
      ]
    });
    await alert2.present();
  }
  async gotoChat(you: string) {
    this.check = false;
    const alert = await this.atrCtrl.create({
        header: '확인!',
        message: '<strong>' + you + '</strong>' + '와 채팅하시겠습니까??',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');

              const tmp1 = this.currentU;
              const tmp2 = you;

              if ( tmp1 === tmp2 ) {
                this.chat2Me();
              } else {
                this.chattingRef = this.fs.collection('chatting', ref => ref.orderBy('Timestamp')).valueChanges();
                const db = firebase.firestore();
                const collection = db.collection('chatting');

                collection.get().then(snapshot => {
                  snapshot.forEach(doc => {
                    const get1 = doc.data().uid1;
                    const get2 = doc.data().uid2;
                    this.getuid1 = get1;
                    this.getuid2 = get2;
                    if ((tmp1 === this.getuid1 && tmp2 === this.getuid2) || (tmp1 === this.getuid2 && tmp2 === this.getuid1)) {
                      this.check = true;
                    }
                  });
                  if (this.check === false) {
                    this.size = snapshot.size;
                    if (this.size === 0) { // 채팅 목록이 한개도 없음
                      this.index = 0;
                      this.fs.collection('ListSize').doc('index').set({
                        index: this.index
                      });
                      this.fs.collection('chatting').doc((this.index).toString()).set({
                        uid1: this.currentU,
                        uid2: you,
                        Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        num: this.index
                      });
                    } else { // 채팅 목록이 1개이상 존재할 때
                      // tslint:disable-next-line:no-shadowed-variable
                      db.collection('ListSize').get().then( snapshot => {
                        snapshot.forEach(doc => {
                          this.getSize = doc.data().index;
                          this.index = this.getSize;
                          this.index = this.index + 1;
                          this.fs.collection('chatting').doc((this.index).toString()).set({
                            uid1: this.currentU,
                            uid2: you,
                            Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            num: this.index
                          });
                          this.fs.collection('ListSize').doc('index').set({
                            index: this.index
                          });
                        });
                      });
                    }
                    console.log('new chatting list');
                  }
                });
                this.router.navigate(['chat-view', you]);
                }
            }
          }
        ]
    });
    await alert.present();
  }
}
