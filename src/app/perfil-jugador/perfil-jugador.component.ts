import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/services/firestore.service';

@Component({
  selector: 'app-perfil-jugador',
  templateUrl: './perfil-jugador.component.html',
  styleUrls: ['./perfil-jugador.component.scss'],
})
export class PerfilJugadorComponent  implements OnInit {

   playerId: string | null = null;
  playerProfile: any = null;

   user: any; // Variable para almacenar la información del usuario
  userEmail: string | null = null; // Variable para almacenar el email del usuario

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private firestoreService: FirestoreService,
    private router: Router

  ) {}

  ngOnInit() {

        this.checkUserStatus();

    // Obtén el ID del jugador desde la URL
    this.playerId = this.route.snapshot.paramMap.get('id');

    if (this.playerId) {
      // Busca el perfil del jugador en Firestore
      this.firestore.collection('players', ref => ref.where('playerName', '==', this.playerId))
        .valueChanges()
        .subscribe(playerData => {
          if (playerData && playerData.length > 0) {
            this.playerProfile = playerData[0]; // Asume que los nombres son únicos
          } else {
            console.error('No se encontró el perfil del jugador');
          }
        });
    }
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





 jugadores() {
    this.router.navigate(['/Jugadores']); // Cambia a la ruta anterior deseada
  }

}
