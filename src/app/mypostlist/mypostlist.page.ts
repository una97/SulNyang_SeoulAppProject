import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-mypostlist',
  templateUrl: './mypostlist.page.html',
  styleUrls: ['./mypostlist.page.scss'],
})
export class MypostlistPage implements OnInit {
  userid: string;
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
    firebase.database().ref().once('value').then((snapshot) => {
      this.db.list('regisTxt/', ref => ref.orderByChild('userid').equalTo(this.userid)).valueChanges().subscribe(
        data => {
          console.log(data);
          this.items = data;
       });
    });
  }
  getPost(item: any) {
    this.code = item.code;
    this.writer = item.userid;
    this.router.navigate(['post', this.code, this.writer]);
  }
}
