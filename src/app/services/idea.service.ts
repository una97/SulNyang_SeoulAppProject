import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import { map , take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Idea {
  id?: string;
  pic?: string;
  name: string;
  notes: string;
}

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  public ideas: Observable<Idea[]>;
  public ideaCollection: AngularFirestoreCollection<Idea>;
  public groupCollection: AngularFirestoreCollection<Idea>;
  public groups: Observable<Idea[]>;

  constructor(private afs: AngularFirestore) {
      this.ideaCollection = this.afs.collection<Idea>('ideas'); //make firestore documents, every element will be there
      this.ideas = this.ideaCollection.snapshotChanges().pipe(
          map(actions => {
              return actions.map(a => {
                  const data = a.payload.doc.data();
                  const id = a.payload.doc.id;
                  return { id, ...data };
              });
          })
      );
      this.groupCollection = this.afs.collection<Idea>('groups'); //make firestore documents, every element will be there
      this.groups = this.groupCollection.snapshotChanges().pipe(
          map(actions => {
              return actions.map(a => {
                  const data = a.payload.doc.data();
                  const id = a.payload.doc.id;
                  return { id, ...data };
              });
          })
      );
   }
   getGroups(): Observable<Idea[]> {
        return this.groups;
   }
   getIdeas(): Observable<Idea[]> {
       return this.ideas;
   }

   getIdea(id: string): Observable<Idea> {
       return this.ideaCollection.doc<Idea>(id).valueChanges().pipe(
           take(1),
           map(idea => {
               idea.id = id;
               return idea;
           })
       );
   }

   addIdea(idea: Idea): Promise<DocumentReference> {
       return this.ideaCollection.add(idea);
   }

   updateIdea(idea: Idea): Promise<void> {
       return this.ideaCollection.doc(idea.id).update({name: idea.name, notes: idea.notes});
   }

   deleteIdea(id: string): Promise<void> {
       return this.ideaCollection.doc(id).delete();
   }
}
