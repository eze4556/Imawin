import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { PlayerProfile } from 'src/models/playerProfile.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';




@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss'],
})
export class PlayerProfileComponent  implements OnInit {

  player: PlayerProfile = {
    playerType: 'jugador',
    footPreference: 'derecho',
    position: 'central',
    country: '',
    detalle: '',
    province: '',
    playerName: '',
    lastClub: '',
    currentClub: '',
    age: null,
    height: null,
    yearsOfExperience: null,
    videoLink: '',
    profilePhotoUrl: ''
  };

selectedFile: File | null = null;



  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router,
      private auth: AngularFireAuth,

  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }







onFileSelected(event: Event) {
  const fileInput = event.target as HTMLInputElement;

  // Verificar si fileInput.files no es null
  if (fileInput.files && fileInput.files.length > 0) {
    this.selectedFile = fileInput.files[0];
  } else {
    this.selectedFile = null; // O manejar el caso de no seleccionar archivo
  }
}




// createPlayerProfile() {

//   if (!this.selectedFile) {
//     console.error('No se ha seleccionado ningún archivo');
//     return;
//   }

//   const filePath = `profilePhotos/${this.selectedFile.name}`;
//   const fileRef = this.storage.ref(filePath);


//   const task = this.storage.upload(filePath, this.selectedFile);
//   task.snapshotChanges().subscribe({
//     next: () => {
//     },
//     error: (error) => {
//       console.error('Error al subir la foto de perfil: ', error);
//     },
//     complete: () => {

//       fileRef.getDownloadURL().subscribe((url) => {
//         this.player.profilePhotoUrl = url;

//         this.firestore.collection('players').add(this.player)
//           .then(() => {
//             console.log('Perfil de jugador creado con éxito!');
//             this.router.navigate(['/perfilJugador/:id', this.player.playerName  ]);
//           })
//           .catch((error) => {
//             console.error('Error al crear el perfil de jugador: ', error);
//           });
//       });
//     }
//   });
// }


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
        this.firestore.collection('players').add(this.player)
          .then(() => {
            console.log('Perfil de jugador creado con éxito!');
            // Redirige a la ruta de perfil del jugador pasando el nombre del jugador
            this.router.navigate([`/perfilJugador`, this.player.playerName]);
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
