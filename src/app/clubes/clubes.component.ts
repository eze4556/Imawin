import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClubProfile } from 'src/models/club.model';
import { FirestoreService } from 'src/services/firestore.service';

@Component({
  selector: 'app-clubes',
  templateUrl: './clubes.component.html',
  styleUrls: ['./clubes.component.css']
})
export class ClubesComponent implements OnInit {

  clubs: ClubProfile[] = [];

  constructor(private router: Router,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {
    this.getAllClubs();
  }

    navigateToAgente() {
    this.router.navigate(['profileClub']); // Navega a la ruta 'playerProfile'
  }

  getAllClubs() {
    this.firestoreService.getClubs().subscribe(data => {
      console.log("Datos de clubes obtenidos:", data);
      if (data && data.length > 0) {
        this.clubs = data;
      } else {
        console.log("No se encontraron clubes.");
      }
    }, error => {
      console.error("Error al obtener los clubes:", error);
    });
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

}
