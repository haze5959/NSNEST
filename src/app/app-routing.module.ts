import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppNewspeed } from './newspeed/app.newspeed';
import { AppBoard } from './board/app.board';
import { AppElbum } from './elbum/app.elbum';
import { AppTastyLoad } from './tastyLoad/app.tastyLoad';
import { AppWrite } from './write/app.write';
import { AppDetail } from './detail/app.detail';
import { AppSideUserList } from './sideUserList/app.sideUserList';

const routes: Routes = [
  { path: '', redirectTo: '/newspeed', pathMatch: 'full' },
  { path: 'newspeed', component: AppNewspeed },
  { path: 'board', component: AppBoard },
  { path: 'elbum', component: AppElbum },
  { path: 'tastyLoad', component: AppTastyLoad },
  { path: 'userList', component: AppSideUserList },

  { path: 'write/:classify', component: AppWrite },
  { path: 'detail/:postId', component: AppDetail },
  { path: '**', component: AppNewspeed }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
