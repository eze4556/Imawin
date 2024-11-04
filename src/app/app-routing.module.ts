import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProfilePlayerComponent } from './profile-player/profile-player.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { DetalleJugadorComponent } from './detalleJugador/detalleJugador.component';
import { PerfilAgenteComponent } from './perfilAgente/perfilAgente.component';
import { ClubesComponent } from './clubes/clubes.component';
import { ProfileClubComponent } from './profileClub/profileClub.component';
import { DtsComponent } from './dts/dts.component';
import { PerfilDtComponent } from './perfilDt/perfilDt.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { DtAgregarComponent } from './dt-agregar/dt-agregar.component';
import { ManagerAgregarComponent } from './manager-agregar/manager-agregar.component';
import { ClubAgregarComponent } from './club-agregar/club-agregar.component';
import { PerfilClubComponent } from './perfil-club/perfil-club.component';
import { PerfilJugadorComponent } from './perfil-jugador/perfil-jugador.component';



const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },

  {
  path: 'Jugadores',
  component: ProfilePlayerComponent
},

  {
  path: 'playerDetail',
  component: PlayerDetailComponent
},

  {
  path: 'detalleJugador',
  component:DetalleJugadorComponent
},
  {
  path: 'agentePerfil',
  component:PerfilAgenteComponent
},
  {
  path: 'clubes',
  component:ClubesComponent
},
 {
  path: 'profileClub',
  component:ProfileClubComponent
},

 {
  path: 'dts',
  component:DtsComponent
},

   {
    path: 'profileDt/:id',
    component: PerfilDtComponent
  },

 {
  path: 'register',
  component:RegisterComponent
},

 {
  path: 'login',
  component:LoginComponent
},

 {
  path: 'crearJugador',
  component:PlayerProfileComponent
},

{
  path: 'perfilJugador/:id',
  component:PerfilJugadorComponent
},

 {
  path: 'dtAgregar',
  component:DtAgregarComponent
},

 {
  path: 'managerAgregar',
  component:ManagerAgregarComponent
},
 {
  path: 'clubAgregar',
  component:ClubAgregarComponent
},
 {
  path: 'perfilClub/:id',
  component:PerfilClubComponent
},

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
