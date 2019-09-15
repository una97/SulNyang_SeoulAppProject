import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'post', loadChildren: './post/post.module#PostPageModule' },
  { path: 'create-post', loadChildren: './create-post/create-post.module#CreatePostPageModule' },
  { path: 'tabs/tab4',  loadChildren: './pages/idea-list/idea-list.module#IdeaListPageModule' },
  { path: 'idea/:id', loadChildren: './pages/idea-details/idea-details.module#IdeaDetailsPageModule' },  { path: 'chat-view', loadChildren: './chat-view/chat-view.module#ChatViewPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
