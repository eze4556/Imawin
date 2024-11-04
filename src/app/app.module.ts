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
import { DetalleJugadorComponent } from './detalleJugador/detalleJugador.component';
import { PerfilAgenteComponent } from './perfilAgente/perfilAgente.component';
import { ClubesComponent } from './clubes/clubes.component';
import { ProfileClubComponent } from './profileClub/profileClub.component';
import { DtsComponent } from './dts/dts.component';
import { PerfilDtComponent } from './perfilDt/perfilDt.component';


import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Si usarás autenticación
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Importar Firestore
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { DtAgregarComponent } from './dt-agregar/dt-agregar.component';
import { ManagerAgregarComponent } from './manager-agregar/manager-agregar.component';
import { ClubAgregarComponent } from './club-agregar/club-agregar.component';
import { PerfilClubComponent } from './perfil-club/perfil-club.component';

import { PerfilJugadorComponent } from './perfil-jugador/perfil-jugador.component';

@NgModule({
  declarations: [												AppComponent,
      ProfilePlayerComponent,
      PlayerDetailComponent,
      DetalleJugadorComponent,
      PerfilAgenteComponent,
      ClubesComponent,
      ProfileClubComponent,
      DtsComponent,
      PerfilDtComponent,
      RegisterComponent,
      RegisterComponent,
      LoginComponent,
      PlayerProfileComponent,
      DtAgregarComponent,
      ManagerAgregarComponent,
      ClubAgregarComponent,
      PerfilClubComponent,
      PerfilJugadorComponent

   ],
  imports: [BrowserModule,    AngularFireStorageModule,
 IonicModule.forRoot(), AngularFirestoreModule, FormsModule, AppRoutingModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireAuthModule, ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
