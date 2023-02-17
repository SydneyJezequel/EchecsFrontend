import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_components/connexion/login/login.component';
import { RegisterComponent } from './_components/connexion/register/register.component';
import { HomeComponent } from './_components/connexion/home/home.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { BoardAdminComponent } from './_components/admin/board-admin/board-admin.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { httpInterceptorProviders } from './_helpers/auth.interceptor';
import {EchiquierComponent} from "./_components/echecs/echiquier/echiquier.component";
import {CampNoirComponent} from "./_components/echecs/camp-noir/camp-noir.component";
import {CampBlancComponent} from "./_components/echecs/camp-blanc/camp-blanc.component";
import {UserUpdateComponent} from './_components/admin/user-update-component/user-update-component.component';
import { UserAddComponent } from './_components/admin/user-add-component/user-add-component.component';
import { ModalComponent } from './_components/modal/modal.component';




@NgModule({


  /******************************* Déclarations des composants *******************************/
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    EchiquierComponent,
    CampNoirComponent,
    CampBlancComponent,
    UserUpdateComponent,
    UserAddComponent,
    ModalComponent,
  ],


  /******************************* Importations des modules *******************************/
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],


  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})


export class AppModule { }
