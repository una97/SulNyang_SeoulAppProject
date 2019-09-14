import { Component,OnInit, ViewChild } from '@angular/core';
import {IonSegment} from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

 @ViewChild(IonSegment) segment: IonSegment;
  constructor() {}
  ngOnInit(){
 this.segment.value='help';
  }

  segmentChanged(event){
    const valueSeg = event.detail.value;
    console.log(valueSeg);
  }
}
