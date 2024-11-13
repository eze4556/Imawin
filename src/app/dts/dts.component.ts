import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DtProfile } from 'src/models/dt.model';
import { FirestoreService } from 'src/services/firestore.service';

@Component({
  selector: 'app-dts',
  templateUrl: './dts.component.html',
  styleUrls: ['./dts.component.css']
})
export class DtsComponent implements OnInit {
  dts: DtProfile[] = [];
  constructor(private router: Router,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {
    this.getAllDts();
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

   navigateToAgente() {
    this.router.navigate(['profileDt']); // Navega a la ruta 'playerProfile'
  }

  getAllDts() {
    this.firestoreService.getDts().subscribe(data => {
      console.log("Datos de DTs obtenidos:", data);
      if (data && data.length > 0) {
        this.dts = data;
      } else {
        console.log("No se encontraron DTs.");
      }
    }, error => {
      console.error("Error al obtener los DTs:", error);
    });
  }

}
