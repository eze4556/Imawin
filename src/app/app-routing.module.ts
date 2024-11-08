import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProfilePlayerComponent } from './profile-player/profile-player.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { ClubesComponent } from './clubes/clubes.component';
import { DtsComponent } from './dts/dts.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';



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
  path: 'clubes',
  component:ClubesComponent
},
{
  path: 'dts',
  component:DtsComponent
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
  path: 'perfil',
  component:PerfilComponent
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
