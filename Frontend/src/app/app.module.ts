import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ComplaintTrackingComponent } from './pages/complaint-tracking/complaint-tracking.component';
import { ComplaintsComponent } from './pages/complaints/complaints.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DashboardOfficialsComponent } from './pages/dashboard-officials/dashboard-officials.component';
import { NoticesComponent } from './pages/notices/notices.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    ComplaintTrackingComponent,
    ComplaintsComponent,
    ContactComponent,
    DashboardOfficialsComponent,
    NoticesComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginSignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, // Add ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
