import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import {AngularFireStorage} from 'angularfire2/storage';
import {AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  useremail;
  userpic;
 
  constructor(
    public stor: Storage,
    public st: AngularFireStorage,
    public db: AngularFireDatabase
  ) {}
  ngOnInit() {
    /*let userpictmp;
    this.stor.get('email').then((val) => {
      this.useremail = val;
      console.log(val);
      // tslint:disable-next-line:only-arrow-functions
      firebase.database().ref().child('userInfo').child(`${this.useremail}/userpic`).once('value', function(data) {
        userpictmp = data.val();
      }).then( result => {
        document.getElementById('upicsmall').setAttribute('src', result.val());
      });
    });*/
    /*this.stor.get('pic').then((val) => {
      this.userpic = val;
      console.log(val);
      document.getElementById('upicsmall').setAttribute('src', val);
    });*/
    

  }
}
