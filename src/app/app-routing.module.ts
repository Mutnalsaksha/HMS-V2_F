import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import {LoginComponent} from "./CareTaker/login/login.component";
import {ServicehandlerComponent} from "./CareTaker/servicehandler/servicehandler.component";
import {LastsevendaysTableComponent} from "./CareTaker/Tickets/lastsevendays-table/lastsevendays-table.component";
import { TicketDetailsFormComponent } from "./ticket-details-form/ticket-details-form.component";
import {ProfileComponent} from "./CareTaker/profile/profile.component";

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'services',component:ServicesComponent},
  {path:'aboutus',component:AboutusComponent},
  {path:'contactus',component:ContactusComponent},
  {path:'login',component:LoginComponent},
  {path:'service-handler',component:ServicehandlerComponent},
  {path: 'ticket-details/:id', component: TicketDetailsFormComponent },
  {path:'sevendays-table',component:LastsevendaysTableComponent},
  {path:'profile', component:ProfileComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
