import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { TermsComponent } from './terms/terms.component';
import { ContactusComponent } from './contactus/contactus.component';

const routes: Routes = [
  {
     path: '',
     component: LoginComponent,
    //  redirectTo: 'login'
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'terms',
    component: TermsComponent
  },
  {
    path: 'contactus',
    component: ContactusComponent
  },
  {
    path:'**',
    component: LoginComponent

  },
  {path: '', redirectTo:'', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
