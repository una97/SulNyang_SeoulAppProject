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
  lat;
  lng;

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
        center:{lat:37.5577376,lng:126.959146},
        zoom:11
      }
      this.map=new google.maps.Map(document.getElementById("map"),mapOptions);
    });
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

  showMarker(item, i){
    console.log(i);
    if(i==0 )
    {
      this.lat=37.564465;
      this.lng=126.813365;
    }
    else if(i==1){
      this.lat=37.448045;
      this.lng=126.901205;
    }
    else if(i==2){
      this.lat=37.585272;
      this.lng=126.819724;
    }
    else if(i==3){
      this.lat=37.542274;
      this.lng=127.125872;
    }
    else if(i==4){
      this.lat=37.549476;
      this.lng=127.167668;
    } 
    else if(i==5){
      this.lat=37.495201;
      this.lng=127.060946;
    }
    else if(i==6){
      this.lat=37.561653;
      this.lng=127.162310;
    }
     this.map=new google.maps.Map(document.getElementById("map"),{
      center:{lat:this.lat,lng:this.lng},
      zoom:13
    });
    var myLatLng=new google.maps.LatLng(this.lat,this.lng);
    this.marker=new google.maps.Marker({
      position:myLatLng,
      title:item.address,
      map:this.map
    });
  }
}
