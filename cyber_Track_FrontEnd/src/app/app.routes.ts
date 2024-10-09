import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NoticeComponent } from './pages/notice/notice.component';
import { ComplaintsComponent } from './pages/complaints/complaints.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SuccessComponent } from './pages/success/success.component';


export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'login', component: LoginComponent},
    {path: 'notice', component: NoticeComponent},
    {path: 'complaints', component: ComplaintsComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'success', component: SuccessComponent}

];
