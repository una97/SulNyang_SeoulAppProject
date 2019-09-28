import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Idea, IdeaService } from 'src/app/services/idea.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.page.html',
  styleUrls: ['./idea-list.page.scss'],
})
export class IdeaListPage implements OnInit {

  public ideas: Observable<Idea[]>;

  constructor(private ideaService: IdeaService, private iab: InAppBrowser) { }

  ngOnInit() {
      this.ideas = this.ideaService.getIdeas();
  }
  openBlank(note) {
    console.log(note);
    this.iab.create(note, `_blank`);
  }
}
