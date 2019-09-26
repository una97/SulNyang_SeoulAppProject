import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

// Firebase Module
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';


// Firebase Config
import { firebaseConfig } from './firebase';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Camera } from '@ionic-native/camera/ngx';
import {DataFinderService} from './data-finder.service';
import {HttpModule} from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig, environment.firebase),
    IonicStorageModule,
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFirestore,
    DataFinderService,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} },
    Geolocation,
    InAppBrowser
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
