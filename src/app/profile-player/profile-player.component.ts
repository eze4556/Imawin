import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el servicio Router
import { PlayerProfile } from 'src/models/playerProfile.model';
import { FirestoreService } from 'src/services/firestore.service';


@Component({
  selector: 'app-profile-player',
  templateUrl: './profile-player.component.html',
  styleUrls: ['./profile-player.component.css']
})
export class ProfilePlayerComponent implements OnInit {

   players: any[] = [];


    // Variables para los filtros
  tipoJugador: string = 'jugador';
  piernaHabil: string = 'ambos';
  posicion: string = 'todos';
  edad: number = 20;
  altura: number = 170;
  experiencia: number = 10;
  buscador: string = '';
  pais: string = '';
  provincia: string = '';
  ciudad: string = '';

    jugadoresFiltrados: any[] = []; // Lista de jugadores después del filtro




  constructor(private router: Router,private firestoreService: FirestoreService) { }

  ngOnInit() {

        this.getAllPlayers();

  }

   navigateToPlayerProfil() {
    this.router.navigate(['detalleJugador']);
  }


getAllPlayers() {
    this.firestoreService.getPlayers().subscribe((data: PlayerProfile[]) => {
      console.log("Datos de jugadores obtenidos:", data);
      this.players = data;
      this.aplicarFiltros();  // Aplica los filtros después de cargar los jugadores
    }, error => {
      console.error("Error al obtener los jugadores:", error);
    });
  }

aplicarFiltros() {
  this.jugadoresFiltrados = this.players.filter(jugador => {
    return (
      (this.tipoJugador === 'todos' || jugador.playerType === this.tipoJugador) &&
      (this.piernaHabil === 'ambas' || jugador.footPreference === this.piernaHabil) &&
      (this.posicion === 'todos' || jugador.position === this.posicion) &&
      (!this.edad || jugador.age >= this.edad) &&
      (!this.altura || jugador.height >= this.altura) &&
      (!this.experiencia || jugador.yearsOfExperience >= this.experiencia) &&
      (!this.pais || jugador.country.toLowerCase().includes(this.pais.toLowerCase())) &&
      (!this.provincia || jugador.province.toLowerCase().includes(this.provincia.toLowerCase())) &&
      (!this.buscador || jugador.playerName.toLowerCase().includes(this.buscador.toLowerCase()))
    );
  });
  console.log("Jugadores filtrados:", this.jugadoresFiltrados);
}

navigateTo(route: string) {
  this.router.navigate([`/${route}`]);
}

}



















