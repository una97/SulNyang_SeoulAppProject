import { Component, OnInit} from '@angular/core';
import {Platform } from '@ionic/angular';
import { DataFinderService } from '../data-finder.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {ActivatedRoute} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';

declare var google;

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.page.html',
  styleUrls: ['./hospital.page.scss'],
})
export class HospitalPage implements OnInit {

  //json data
  hospitalName:string;
  map:any;
  marker:any=[];
  lat:any="";
  lng:any="";
  timestamp:any="";
  infowindow:any=[];
  informGu:any;
  totalLat=0;
  totalLng=0;
  avgLat;
  avgLng;

  constructor(
    public platform:Platform,
    public geolocation:Geolocation,
    public dataFinder:DataFinderService,
    public ac : ActivatedRoute

  ) 
  { 
    //this.userGu=this.ac.snapshot.paramMap.get('userGu');
    ////지도
    if(this.marker.length!=0)
    {
      for(let i=0;i<this.marker.length;i++){
        this.marker[i].setMap(null);
        this.marker[i]=null;
      }
    }
      this.platform.ready().then(()=>{
        var mapOptions={
          center:{lat:37.6662953,lng:126.9948531},
          zoom:13
        }
        this.map=new google.maps.Map(document.getElementById("map"),mapOptions);
        
      });      
      
  }

  ngOnInit() {
    
  }

  showHospital(){
    //json데이터 가져오기
    this.dataFinder.getJSONDataAsync("../../assets/data/"+this.informGu+".json").then(data=>{
      this.SetQueryOptionsData(data);
    });
    
  }
  SetQueryOptionsData(items:any){ //items는 json데이터들
    this.totalLat=0;
    this.totalLng=0;
    if(this.marker.length!=0)
    {
      for(let i=0;i<this.marker.length;i++){
        this.marker[i].setMap(null);
        this.marker[i]=null;
      }
    }
    this.hospitalName= items.results;//data는 json파일의 id
    console.log(this.hospitalName);
    for(let i=0;i<this.hospitalName.length;i++){
      this.totalLat+=this.hospitalName[i].geometry.location.lat;
      this.totalLng+=this.hospitalName[i].geometry.location.lng;
    }
    this.avgLat=this.totalLat/this.hospitalName.length;
    this.avgLng=this.totalLng/this.hospitalName.length;
    this.map=new google.maps.Map(document.getElementById("map"),{
      center:{lat:this.avgLat,lng:this.avgLng},
      zoom:13
    });
    for(let i=0;i<this.hospitalName.length;i++){
      var myLatlng=new google.maps.LatLng(this.hospitalName[i].geometry.location.lat,this.hospitalName[i].geometry.location.lng);
      this.marker[i]=new google.maps.Marker({
        position:myLatlng,
        title:this.hospitalName[i].name,
        map:this.map
      });
    }
    console.log(this.marker);
  }
}