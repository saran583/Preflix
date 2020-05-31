import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RequestComponent } from './request/request.component';
import { AddnewComponent } from './addnew/addnew.component';
import { PlaymovieComponent } from './playmovie/playmovie.component';
import { TrailerComponent } from './trailer/trailer.component';
import { PartyComponent } from './party/party.component';


const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"request",component:RequestComponent},
  {path:"addnew", component:AddnewComponent},
  {path:"playmovie", component:PlaymovieComponent},
  {path:"trailer", component:TrailerComponent},
  {path:"party/:invite", component:PartyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
