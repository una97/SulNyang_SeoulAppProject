import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdeaService, Idea } from 'src/app/services/idea.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.page.html',
  styleUrls: ['./idea-details.page.scss'],
})
export class IdeaDetailsPage implements OnInit {

  info: Idea = {
    name: '',
    notes: '',
    pic: ''
};
 constructor(private activateRoute: ActivatedRoute, private ideaService: IdeaService,
             private toastCtrl: ToastController, private router: Router) { }

 ngOnInit() {
     let id = this.activateRoute.snapshot.paramMap.get('id');
     if (id) {
         this.ideaService.getIdea(id).subscribe(info => {
             this.info = info;
         });
     }
 }
}
