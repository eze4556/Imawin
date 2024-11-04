import { ChangeDetectorRef, Component,OnInit } from '@angular/core';

import { Router } from '@angular/router'; // Importa el servicio Router

import { FirestoreService } from 'src/services/firestore.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit {
 user: any; // Variable para almacenar la información del usuario
  userEmail: string | null = null; // Variable para almacenar el email del usuario


  constructor(private router: Router, private firestoreService: FirestoreService,private cdRef: ChangeDetectorRef) {}

   ngOnInit() {
    this.checkUserStatus();
  }

 // Método para comprobar si el usuario está logueado
  checkUserStatus() {
    this.firestoreService.getCurrentUser().subscribe(user => {
      if (user) {
        this.user = user; // Si el usuario está logueado, almacena su información
        this.userEmail = user.email; // Guarda el email del usuario logueado
      } else {
        this.user = null; // Si no está logueado, se reinicia la variable
        this.userEmail = null;
      }
    });
  }




   navigateToPlayerProfile() {
    this.router.navigate(['crearJugador']); // Navega a la ruta 'playerProfile'
  }



  navigateManager(){
    this.router.navigate(['managerAgregar']); // Navega a la ruta 'playerProfile'

  }

 navigateToClubes() {
    this.router.navigate(['clubAgregar']); // Navega a la ruta 'playerProfile'
  }


 navigateToDt() {
    this.router.navigate(['dtAgregar']); // Navega a la ruta 'playerProfile'
  }


   navigateToRegister() {
    this.router.navigate(['register']); // Navega a la ruta 'playerProfile'
  }


    goToManagerAgregar() {
    this.router.navigate(['/managerAgregar']);
  }



  clubes() {
    this.router.navigate(['clubes']); // Navega a la ruta 'playerProfile'
  }

  jugadores() {
    this.router.navigate(['Jugadores']); // Navega a la ruta 'playerProfile'
  }

 manager() {
    this.router.navigate(['playerDetail']); // Navega a la ruta 'playerProfile'
  }

  dts() {
    this.router.navigate(['dts']); // Navega a la ruta 'playerProfile'
  }


}
