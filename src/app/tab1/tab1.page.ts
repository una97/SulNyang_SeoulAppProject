import { Component,OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public h = 1;
  public m = 0;

  constructor(
    public plat: Platform,
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public router: Router,
    public atrCtrl: AlertController,
    public stor: Storage,
    ) {}
  public userid: string = null;
  public userauth: string = null;
    ionViewWillEnter() {
      this.stor.get('id').then((val) => {
        this.userid = val;
        console.log(val);
      });
      this.stor.get('auth').then((val) => {
        this.userauth = val;
        console.log(val);
      });
    }
    ngOnInit(){
      firebase.database().ref().once('value').then((snapshot) => {
        // tslint:disable-next-line: prefer-const
        let i = 0;
        
        for(;i<25;i++){
          let ifnum = snapshot.child('seoulGu/'+i+'/informNum').val();
          let Gu_ary = ["JR","JG","YS","SD","GJ","DDM","JL","SB","GB","DB","NW","EP","SDM","MP","YC","GS","GR","GC","YDP","DJ","GA","SC","GN","SP","GD"];
          let Gu_name = Gu_ary[i];

          if(ifnum>this.h){
            document.getElementById(Gu_name + '_Y').setAttribute('src','');
            document.getElementById(Gu_name + '_G').setAttribute('src','');
          }else if(ifnum>this.m){
            document.getElementById(Gu_name + '_G').setAttribute('src','');
          }
        }
        
      });
    }
    

    checkInform() {
      this.router.navigateByUrl('cinform');
    }
    goInform() {
      this.router.navigateByUrl('inform');
    }
    goMap() {
      this.router.navigateByUrl('hospital');
    }
    goDevelop() {
      this.router.navigateByUrl('re-develop');
    }
    goProgress() {
      this.router.navigateByUrl('progress');
    }
}
