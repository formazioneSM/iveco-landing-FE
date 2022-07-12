import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Landing1Component } from './components/landing1/landing1.component';
import { Landing2Component } from './components/landing2/landing2.component';

const routes: Routes = [
  {
    path: '1270all',
    pathMatch: 'full',
    component: Landing1Component
  },
  {
    path: '2360ope',
    pathMatch: 'full',
    component: Landing2Component  
  },
  {
    path: '**',
    redirectTo: '1270all'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true ,
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
