import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes} from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent } from "./CareTaker/login/login.component";
import { ServicehandlerComponent} from "./CareTaker/servicehandler/servicehandler.component";
import { LastsevendaysTableComponent } from './CareTaker/Tickets/lastsevendays-table/lastsevendays-table.component';
import {DateFormatPipe} from "./pipes/date-format.pipe";
import { TicketDetailsFormComponent } from './ticket-details-form/ticket-details-form.component';
import { ProfileComponent } from './CareTaker/profile/profile.component';

const routes: Routes = [
  // Other routes...
  { path: 'ticket-details/:id', component: TicketDetailsFormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServicesComponent,
    AboutusComponent,
    ContactusComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ServicehandlerComponent,
    LastsevendaysTableComponent,
    DateFormatPipe,
    TicketDetailsFormComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    [RouterModule.forRoot(routes)],
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
