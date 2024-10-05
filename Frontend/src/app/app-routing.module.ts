import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ComplaintTrackingComponent } from './pages/complaint-tracking/complaint-tracking.component';
import { ComplaintsComponent } from './pages/complaints/complaints.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DashboardOfficialsComponent } from './pages/dashboard-officials/dashboard-officials.component';
import { NoticesComponent } from './pages/notices/notices.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: 'about-us', component: AboutUsComponent },
  { path: 'complaint-tracking', component: ComplaintTrackingComponent },
  { path: 'complaints', component: ComplaintsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dashboard-officials', component: DashboardOfficialsComponent },
  { path: 'notices', component: NoticesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginSignupComponent },
  // Add additional routes here as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
