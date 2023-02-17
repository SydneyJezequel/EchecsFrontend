import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./_components/connexion/home/home.component";
import {LoginComponent} from "./_components/connexion/login/login.component";
import {RegisterComponent} from "./_components/connexion/register/register.component";
import {ProfileComponent} from "./_components/profile/profile.component";
import {BoardAdminComponent} from "./_components/admin/board-admin/board-admin.component";
import {CampBlancComponent} from "./_components/echecs/camp-blanc/camp-blanc.component";
import {EchiquierComponent} from "./_components/echecs/echiquier/echiquier.component";
import {CampNoirComponent} from "./_components/echecs/camp-noir/camp-noir.component";
import {UserUpdateComponent} from "./_components/admin/user-update-component/user-update-component.component";
import {UserAddComponent} from "./_components/admin/user-add-component/user-add-component.component";


/**
 * Le routeur gère le routage de cette application.
 */
const routes: Routes = [
  { path:'home', component: HomeComponent },
  { path:'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'profile', component: ProfileComponent },
  { path:'admin', component: BoardAdminComponent },
  { path:'blanc',component: CampBlancComponent },
  { path:'noir',component: CampNoirComponent },
  { path:'echiquier',component: EchiquierComponent },
  { path:'admin/edit/:id',component: UserUpdateComponent },
  { path:'admin/add',component: UserAddComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
