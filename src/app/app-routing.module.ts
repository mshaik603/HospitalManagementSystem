import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthGaurdService } from './services/auth-gaurd.service';

const routes: Routes = [
  {path:'',component:LoginComponent, pathMatch:'full'},
  {path:'home',component:HomeComponent, canActivate:[AuthGaurdService]},
  {path:'login',component:LoginComponent},
  {path:'master',component:HeaderComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
