import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el servicio Router
import { FirestoreService } from 'src/services/firestore.service';


@Component({
  selector: 'app-profile-player',
  templateUrl: './profile-player.component.html',
  styleUrls: ['./profile-player.component.css']
})
export class ProfilePlayerComponent implements OnInit {

   players: any[] = [];

  constructor(private router: Router,private firestoreService: FirestoreService) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {

        this.getAllPlayers();

  }

   navigateToPlayerProfil() {
    this.router.navigate(['detalleJugador']);
  }


 getAllPlayers() {
  this.firestoreService.getPlayers().subscribe(data => {
    console.log("Datos de jugadores obtenidos:", data); // Verificar si los datos llegan aquí
    if (data && data.length > 0) {
      this.players = data;
    } else {
      console.log("No se encontraron jugadores.");
    }
  }, error => {
    console.error("Error al obtener los jugadores:", error);
  });
}


}
