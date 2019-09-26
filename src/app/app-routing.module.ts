import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'post/:code/:writer', loadChildren: './post/post.module#PostPageModule' },
  { path: 'create-post', loadChildren: './create-post/create-post.module#CreatePostPageModule' },
  { path: 'tabs/tab4',  loadChildren: './pages/idea-list/idea-list.module#IdeaListPageModule' },
  { path: 'idea/:id', loadChildren: './pages/idea-details/idea-details.module#IdeaDetailsPageModule' },
  { path: 'chat-view/:you', loadChildren: './chat-view/chat-view.module#ChatViewPageModule' },
  { path: 'inform', loadChildren: './inform/inform.module#InformPageModule' },
  { path: 'hospital', loadChildren: './hospital/hospital.module#HospitalPageModule' },
  { path: 'cinform', loadChildren: './cinform/cinform.module#CinformPageModule' },
  { path: 're-develop', loadChildren: './re-develop/re-develop.module#ReDevelopPageModule' },
  { path: 'progress', loadChildren: './progress/progress.module#ProgressPageModule' },
  { path: 'mypostlist', loadChildren: './mypostlist/mypostlist.module#MypostlistPageModule' },
  { path: 'showinform/:code/:writer', loadChildren: './showinform/showinform.module#ShowinformPageModule' }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
