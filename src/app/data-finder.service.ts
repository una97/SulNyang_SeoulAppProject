import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataFinderService {

  constructor(private http:Http) { }
  public getJSONDataAsync(filepath:string):Promise<any>{
    return new Promise((resolve,reject)=>{
      this.http.get(filepath)
      .subscribe(
        res=>{
          if(!res.ok){
            reject("Failed with status:"+res.status+"\nTrying to find file at"+ filepath);
          }
          var jsonRes=res.json();
          resolve(jsonRes);
        }
      );
    }).catch((reason)=>this.handleError(reason));
  }
/* Takes an error, logs it to the console, and throws it */
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
