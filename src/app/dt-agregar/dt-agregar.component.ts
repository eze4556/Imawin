import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { DtProfile } from 'src/models/dt.model';

@Component({
  selector: 'app-dt-agregar',
  templateUrl: './dt-agregar.component.html',
  styleUrls: ['./dt-agregar.component.scss'],
})
export class DtAgregarComponent  implements OnInit {


  player: DtProfile = {
  dt: 'Activo',

  gusto: 'Ofensivo',
  country: '',
  province: '',
  playerName: '',
  lastClub: '',
  currentClub: '',
  age: null,
  height: null,
  yearsOfExperience: null,
  videoLink: '',
  profilePhotoUrl: '',
  detalle: ''
};



 constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


selectedFile: File | null = null;



  onFileSelected(event: Event) {
  const fileInput = event.target as HTMLInputElement;

  // Verificar si fileInput.files no es null
  if (fileInput.files && fileInput.files.length > 0) {
    this.selectedFile = fileInput.files[0];
  } else {
    this.selectedFile = null;
  }
}




createPlayerProfile() {
  if (!this.selectedFile) {
    console.error('No se ha seleccionado ningún archivo');
    return;
  }

  const filePath = `profilePhotos/${this.selectedFile.name}`;
  const fileRef = this.storage.ref(filePath);

  const task = this.storage.upload(filePath, this.selectedFile);
  task.snapshotChanges().subscribe({
    next: () => {
      // Progreso de carga, si se desea
    },
    error: (error) => {
      console.error('Error al subir la foto de perfil: ', error);
    },
    complete: () => {
      fileRef.getDownloadURL().subscribe((url) => {
        this.player.profilePhotoUrl = url;

        // Guarda el perfil en Firestore
        this.firestore.collection('dt').add(this.player)
          .then((docRef) => {
            console.log('Perfil de DT creado con éxito!');
            this.router.navigate([`/profileDt/${docRef.id}`]); // Navega al perfil creado
          })

          .catch((error) => {
            console.error('Error al crear el perfil de DT: ', error);
          });
      });
    }
  });
}



  goBack() {
    this.router.navigate(['/previous-page']); // Cambia a la ruta anterior deseada
  }





}
