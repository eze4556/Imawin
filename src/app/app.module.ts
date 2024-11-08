import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfilePlayerComponent } from './profile-player/profile-player.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { ClubesComponent } from './clubes/clubes.component';
import { DtsComponent } from './dts/dts.component';


import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Si usarás autenticación
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Importar Firestore
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

import { PerfilComponent } from './perfil/perfil.component';
import { ProfileClubComponent } from './profileClub/profileClub.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileClubComponent,
    PerfilComponent,
    ProfilePlayerComponent,
    PlayerDetailComponent,
    ClubesComponent,
    DtsComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireStorageModule,
    IonicModule.forRoot(),
    AngularFirestoreModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Asegúrate de incluirlo aquí
})
export class AppModule {}

