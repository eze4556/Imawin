import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ManagerProfile } from 'src/models/manager.model';

@Component({
  selector: 'app-manager-agregar',
  templateUrl: './manager-agregar.component.html',
  styleUrls: ['./manager-agregar.component.scss'],
})
export class ManagerAgregarComponent  implements OnInit {




  player: ManagerProfile = {
  manager: 'Activo',

  country: '',
  province: '',
  playerName: '',
  lastClub: '',
  currentClub: '',
  age: null,

  yearsOfExperience: null,

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
    this.selectedFile = null; // O manejar el caso de no seleccionar archivo
  }
}


createPlayerProfile() {
  // Asegúrate de que selectedFile no sea null
  if (!this.selectedFile) {
    console.error('No se ha seleccionado ningún archivo');
    return; // O maneja el error como prefieras
  }

  const filePath = `profilePhotos/${this.selectedFile.name}`;
  const fileRef = this.storage.ref(filePath);

  // Subir la imagen a Firebase Storage
  const task = this.storage.upload(filePath, this.selectedFile);
  task.snapshotChanges().subscribe({
    next: () => {
      // Se puede agregar un progreso de carga aquí si se desea
    },
    error: (error) => {
      console.error('Error al subir la foto de perfil: ', error);
    },
    complete: () => {
      // Obtén la URL de descarga
      fileRef.getDownloadURL().subscribe((url) => {
        this.player.profilePhotoUrl = url; // Asigna la URL a la propiedad del modelo
        // Guarda el perfil del jugador en Firestore
        this.firestore.collection('manager').add(this.player)
          .then(() => {
            console.log('Perfil de jugador creado con éxito!');
            this.router.navigate(['/home']);
          })
          .catch((error) => {
            console.error('Error al crear el perfil de jugador: ', error);
          });
      });
    }
  });
}


goBack() {
    this.router.navigate(['/previous-page']); // Cambia a la ruta anterior deseada
  }

}
