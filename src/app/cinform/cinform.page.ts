import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cinform',
  templateUrl: './cinform.page.html',
  styleUrls: ['./cinform.page.scss'],
})
export class CinformPage implements OnInit {
  userid: string;
  userauth: string;
  code: string;
  writer: string;
  items = [];
  constructor(
    public db: AngularFireDatabase,
    public af: AngularFireAuth,
    public stor: Storage,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.stor.get('id').then((val) => {
      this.userid = val;
    });
    this.stor.get('auth').then((val) => {
      this.userauth = val;
      if (this.userauth === '일반사용자') {
        firebase.database().ref().once('value').then((snapshot) => {
          this.db.list('informTxt/', ref => ref.orderByChild('sender').equalTo(this.userid)).valueChanges().subscribe(
            data => {
              console.log(data);
              this.items = data;
           });
        });
      } else if (this.userauth === '관리자') {
        firebase.database().ref().child('informTxt/').once('value', function(data) {
          this.items = data.val();
        });
      }
    });
  }

  getPost(item: any) {
    this.code = item.code;
    this.writer = item.sender;
    this.router.navigate(['showinform', this.code, this.writer]);
  }
}
