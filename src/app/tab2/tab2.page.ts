import { Component,OnInit, ViewChild } from '@angular/core';
import {IonSegment} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
// segment:IonSegment;
 //@ViewChild(IonSegment) segment: IonSegment;
  constructor( public router: Router, public navCtrl: NavController) {}
  ngOnInit(){
//  this.segment.value='help';
  }

  segmentChanged(event){
    const valueSeg = event.detail.value;
    console.log(valueSeg);
  }


  // getPost(item: any) {
  //   this.title = item.title;
  //   // window.location.href = 'post/' + this.title + '/' + this.userid;
  //   this.router.navigate(['post', this.title, this.userid]);
  // }
  goCreatePost(){
    this.router.navigate(['create-post']);
  }
  getPost(){
    this.router.navigate(['post']);
  }

}
