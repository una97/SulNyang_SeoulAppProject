import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataFinderService } from '../data-finder.service';
import {Platform } from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
declare var google;

import { filter } from 'minimatch';
@Component({
  selector: 'app-re-develop',
  templateUrl: './re-develop.page.html',
  styleUrls: ['./re-develop.page.scss'],
})
export class ReDevelopPage implements OnInit {
  redevelop=[];
  displayData=[];
  filteredData1=[];
  filteredData2=[];
  segment:string;

  //지도
  map:any;
  marker:any;
  lat:any="";
  lng:any="";
  timestamp:any="";



  constructor(
    public navCtrl:NavController,
    public dataFinder:DataFinderService, public platform:Platform,
    public geolocation:Geolocation
  ) {
    this.dataFinder.getJSONDataAsync("../../assets/data/redevelop.json").then(data=>{
      this.SetQueryOptionsData(data);
    });

    ///지도
    this.platform.ready().then(()=>{
      var mapOptions={
        center:{lat:37.565767, lng:126.978095},
        zoom:10
      }
      this.map=new google.maps.Map(document.getElementById("map"),mapOptions);
    });
   
      var ref=this;
      let watch=this.geolocation.watchPosition();
      watch.subscribe((position)=>{
        var gps=new google.maps.LatLng(position.coords.latitude,position.coords.longitude); // 내 위치 받아오기
        if(ref.marker == null){
          ref.marker=new google.maps.Marker({
            position:gps,
            map:ref.map,
            title:'my position'
          });
        }
        else{
          ref.marker.setPosition(gps);
        }
        ref.map.panTo(gps);
        ref.lat=position.coords.latitude.toString();
        ref.lng=position.coords.longitude.toString();
        ref.timestamp=(new Date(position.timestamp)).toString();
      });
      ////여기까지
   }

  ngOnInit() {
    this.segment='one';
    this.loadList();
  }
  segmentChanged(event){
    this.segment=event.detail.value;
    this.loadList();
  }
  loadList(){
    if(this.segment=='one'){
      this.displayData=this.filteredData1;
    }
    else{
      this.displayData=this.filteredData2;
    }
  }
  

  SetQueryOptionsData(items:any){ //items는 json데이터들
      this.redevelop= items.DATA;//data는 json파일의 id
      this.DataFilter();
  }
  
  DataFilter(){
    for(let i=0;i<this.redevelop.length;i++){
      

      if(this.redevelop[i].biz_type=='재건축사업구역'){
        if(this.redevelop[i].address!==null&&this.redevelop[i].area!=='0')
        this.filteredData1.push(this.redevelop[i]);
      }
      else if(this.redevelop[i].biz_type=='도시정비형'){
        if(this.redevelop[i].address!==null&&this.redevelop[i].area!=='0')
        this.filteredData2.push(this.redevelop[i]);
      }
    }



    this.filteredData1.sort(function(a,b){
      return a.area > b.area? -1: a.area < b.area?1:0;
    });
    this.filteredData2.sort(function(a,b){
      return a.area > b.area? -1: a.area < b.area?1:0;
    });
  }

}
