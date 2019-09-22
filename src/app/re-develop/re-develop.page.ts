import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataFinderService } from '../data-finder.service';
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
  constructor(
    public navCtrl:NavController,
    public dataFinder:DataFinderService
  ) {
    this.dataFinder.getJSONDataAsync("../../assets/data/redevelop.json").then(data=>{
      this.SetQueryOptionsData(data);
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
  // ionViewDidLoad(){
    
  // }

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
