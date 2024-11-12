import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { GoogleAuthProvider } from 'firebase/auth';
import { map } from 'rxjs/operators';
import { PlayerProfile } from 'src/models/playerProfile.model';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore,private afAuth: AngularFireAuth) { }




  // Método para agregar un documento a una colección
  addDocument(collectionName: string, data: any): Promise<any> {
    return this.firestore.collection(collectionName).add(data);
  }

  // Método para obtener todos los documentos de una colección
  getCollection(collectionName: string): Observable<any[]> {
    return this.firestore.collection(collectionName).valueChanges();
  }

  // Método para obtener un documento por ID
  getDocumentById(collectionName: string, documentId: string): Observable<any> {
    return this.firestore.collection(collectionName).doc(documentId).valueChanges();
  }

  // Método para actualizar un documento por ID
  updateDocument(collectionName: string, documentId: string, data: any): Promise<void> {
    return this.firestore.collection(collectionName).doc(documentId).update(data);
  }

  // Método para eliminar un documento por ID
  deleteDocument(collectionName: string, documentId: string): Promise<void> {
    return this.firestore.collection(collectionName).doc(documentId).delete();
  }




// ==============================
  // Firebase Authentication
  // ==============================

  // Registro con email y contraseña
  registerWithEmail(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        // Guardar información adicional en Firestore
        return this.firestore.collection('usuarios').doc(user?.uid).set({
          uid: user?.uid,
          email: user?.email,
          creado: new Date(),
          loggedIn: true // Marcar al usuario como logueado
        });
      });
  }

  // Registro con Google
  registerWithGoogle(): Promise<any> {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider())
      .then(userCredential => {
        const user = userCredential.user;
        // Guardar información adicional en Firestore si el usuario es nuevo
        return this.firestore.collection('usuarios').doc(user?.uid).set({
          uid: user?.uid,
          email: user?.email,
          creado: new Date(),
          proveedor: 'Google',
          loggedIn: true // Marcar al usuario como logueado
        });
      });
  }

  // Iniciar sesión con email y contraseña
  loginWithEmail(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        // Actualizar el estado de inicio de sesión del usuario en Firestore
        if (user) {
          return this.updateUserStatus(user.uid, true).then(() => user);
        }
        return null;
      });
  }

  // Iniciar sesión con Google
  loginWithGoogle(): Promise<any> {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider())
      .then(userCredential => {
        const user = userCredential.user;
        // Actualizar el estado de inicio de sesión del usuario en Firestore
        if (user) {
          return this.updateUserStatus(user.uid, true).then(() => user);
        }
        return null;
      });
  }

  // Método para actualizar el estado de inicio de sesión del usuario
  updateUserStatus(uid: string, status: boolean): Promise<void> {
    return this.firestore.collection('usuarios').doc(uid).update({ loggedIn: status });
  }



  // Obtener un usuario por ID
  getUserById(uid: string): Observable<any> {
    return this.firestore.collection('usuarios').doc(uid).valueChanges();
  }

  // Eliminar un usuario (de Firebase Authentication y Firestore)
  deleteUser(uid: string): Promise<void> {
    return this.afAuth.currentUser
      .then(user => {
        if (user && user.uid === uid) {
          // Eliminar de Firebase Authentication
          return user.delete().then(() => {
            // Eliminar del Firestore
            return this.firestore.collection('usuarios').doc(uid).delete();
          });
        }
        return Promise.reject('Usuario no autenticado o ID no coincide');
      });
  }

  // ==============================
  // Firestore (para usuarios)
  // ==============================

  // Obtener todos los usuarios
  getUsers(): Observable<any[]> {
    return this.firestore.collection('usuarios').valueChanges();
  }



  // Método para obtener el usuario actualmente autenticado
  getCurrentUser(): Observable<any> {
    return this.afAuth.user; // Esto devuelve un observable del usuario autenticado
  }



//FUTBOLISTA


getPlayers(): Observable<any[]> {
  return this.firestore.collection('player').valueChanges(); // Aquí asegúrate que sea 'players'
}



filterPlayers(filters: Partial<PlayerProfile>): Observable<PlayerProfile[]> {
  return this.getPlayers().pipe(
    map((players) =>
      players.filter((player) =>
        Object.keys(filters).every((key) => {
          const filterKey = key as keyof PlayerProfile;
          const filterValue = filters[filterKey];
          const playerValue = player[filterKey];
          if (filterValue === undefined || filterValue === null) return true;
          if (typeof filterValue === 'string') {
            return playerValue
              ?.toString()
              ?.toLowerCase()
              ?.includes(filterValue.toLowerCase());
          }
          return playerValue === filterValue;
        })
      )
    )
  );
}










//DIRECTOR-TECNICO


// Método para agregar
addDt(uid: string, profileData: any): Promise<void> {
  return this.firestore.collection('dt').doc(uid).set(profileData);
}

// Método para obtener
getDt(uid: string): Observable<any> {
  return this.firestore.collection('dt').doc(uid).valueChanges();
}

// Método para actualizar
updateDt(uid: string, profileData: any): Promise<void> {
  return this.firestore.collection('dt').doc(uid).update(profileData);
}

// Método para eliminar
deleteDt(uid: string): Promise<void> {
  return this.firestore.collection('dt').doc(uid).delete();
}



//Manager


// Método para agregar
addManager(uid: string, profileData: any): Promise<void> {
  return this.firestore.collection('manager').doc(uid).set(profileData);
}

// Método para obtener
getManager(uid: string): Observable<any> {
  return this.firestore.collection('manager').doc(uid).valueChanges();
}

// Método para actualizar
updateManager(uid: string, profileData: any): Promise<void> {
  return this.firestore.collection('manager').doc(uid).update(profileData);
}

// Método para eliminar
deleteManager(uid: string): Promise<void> {
  return this.firestore.collection('manager').doc(uid).delete();
}



//Club


// Método para agregar
addClub(uid: string, profileData: any): Promise<void> {
  return this.firestore.collection('club').doc(uid).set(profileData);
}

// Método para obtener
getClub(uid: string): Observable<any> {
  return this.firestore.collection('club').doc(uid).valueChanges();
}

// Método para actualizar
updateClub(uid: string, profileData: any): Promise<void> {
  return this.firestore.collection('club').doc(uid).update(profileData);
}

// Método para eliminar
deleteClub(uid: string): Promise<void> {
  return this.firestore.collection('club').doc(uid).delete();
}



getPlayerByUserId(uid: string): Observable<any> {
  return this.firestore.collection('player', ref => ref.where('userId', '==', uid)).valueChanges();
}

getDtByUserId(uid: string): Observable<any> {
  return this.firestore.collection('dt', ref => ref.where('userId', '==', uid)).valueChanges();
}

getManagerByUserId(uid: string): Observable<any> {
  return this.firestore.collection('manager', ref => ref.where('userId', '==', uid)).valueChanges();
}

getClubByUserId(uid: string): Observable<any> {
  return this.firestore.collection('club', ref => ref.where('userId', '==', uid)).valueChanges();
}


}
