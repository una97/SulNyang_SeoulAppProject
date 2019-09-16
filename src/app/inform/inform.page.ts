import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
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
  constructor(
    public plat: Platform,
    public activatedRoute: ActivatedRoute,
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
    this.router.navigateByUrl('/tabs/tab1');
  }

}
