import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerProfile } from 'src/models/manager.model';
import { FirestoreService } from 'src/services/firestore.service';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.scss'],
})
export class ManagersComponent  implements OnInit {
  managers: ManagerProfile[] = [];
  constructor(private firestoreService: FirestoreService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllManagers();
  }

  getAllManagers() {
    this.firestoreService.getManagers().subscribe(data => {
      console.log("Datos de Managers obtenidos:", data);
      if (data && data.length > 0) {
        this.managers = data;
      } else {
        console.log("No se encontraron managers.");
      }
    }, error => {
      console.error("Error al obtener los managers:", error);
    });
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
