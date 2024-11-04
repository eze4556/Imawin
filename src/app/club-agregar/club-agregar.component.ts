import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';


import { ClubProfile } from 'src/models/club.model';

@Component({
  selector: 'app-club-agregar',
  templateUrl: './club-agregar.component.html',
  styleUrls: ['./club-agregar.component.scss'],
})
export class ClubAgregarComponent  implements OnInit {

player: ClubProfile = {
  country: '',
  province: '',
  playerName: '',
  age: null,
  fundacion: null,
  instagram: null,
  facebook: null,
  website: null,
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

//         this.firestore.collection('club').add(this.player)
//           .then(() => {
//             console.log('Perfil de jugador creado con éxito!');
//             this.router.navigate(['/home']);
                        

//           })
//           .catch((error) => {
//             console.error('Error al crear el perfil de jugador: ', error);
//           });
//       });
//     }
//   });
// }

createPlayerProfile() {

  if (!this.selectedFile) {
    console.error('No se ha seleccionado ningún archivo');
    return;
  }

  const filePath = `profilePhotos/${this.selectedFile.name}`;
  const fileRef = this.storage.ref(filePath);

  const task = this.storage.upload(filePath, this.selectedFile);
  task.snapshotChanges().subscribe({
    next: () => {},
    error: (error) => {
      console.error('Error al subir la foto de perfil: ', error);
    },
    complete: () => {
      fileRef.getDownloadURL().subscribe((url) => {
        this.player.profilePhotoUrl = url;

        // Crear el documento en la colección 'club'
        this.firestore.collection('club').add(this.player)
          .then((docRef) => {  // docRef se obtiene aquí correctamente
            console.log('Perfil de club creado con éxito!');
            
            // Redirigir al perfil del club usando el ID del documento recién creado
            this.router.navigate([`/perfilClub/${docRef.id}`]);
          })
          .catch((error) => {
            console.error('Error al crear el perfil de club: ', error);
          });
      });
    }
  });
}



goBack() {
    this.router.navigate(['/previous-page']);
  }


}
