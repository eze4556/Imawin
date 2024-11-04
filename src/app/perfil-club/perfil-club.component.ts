import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-perfil-club',
  templateUrl: './perfil-club.component.html',
  styleUrls: ['./perfil-club.component.scss'],
})
export class PerfilClubComponent  implements OnInit {

  clubProfile: any; // Aquí se almacenarán los datos del club
  clubId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    // Obtener el ID del club desde la URL
    this.clubId = this.route.snapshot.paramMap.get('id');
    if (this.clubId) {
      // Consultar el club en Firestore usando el ID
      this.firestore.collection('club').doc(this.clubId).valueChanges().subscribe((profile) => {
        this.clubProfile = profile;
      });
    }
  }
}