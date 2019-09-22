import { Component, OnInit} from '@angular/core';
import {Platform } from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
declare var google;

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.page.html',
  styleUrls: ['./hospital.page.scss'],
})
export class HospitalPage implements OnInit {

  map:any;
  marker:any;
  lat:any="";
  lng:any="";
  timestamp:any="";

  constructor(
    public platform:Platform,
    public geolocation:Geolocation) 
  { 
      this.platform.ready().then(()=>{
        var mapOptions={
          center:{lat:37.302, lng:126.98},
          zoom:8
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
  }

  ngOnInit() {
  }

  

}
