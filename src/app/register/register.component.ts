import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';  // Importar el Router para la redirección
import { LoadingController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore,private router: Router,  private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
) {}

email: string = '';  // Inicializamos como cadena vacía
  password: string = '';  // Inicializamos como cadena vacía

 async registerWithEmail() {
    if (!this.email || !this.password) {
      this.showToast('Por favor, complete todos los campos.');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Registrando...',
    });
    await loading.present();

    this.afAuth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log('Usuario registrado:', user);

        // Guardar información en Firestore
        await this.firestore.collection('usuarios').doc(user?.uid).set({
          uid: user?.uid,
          email: user?.email,
          creado: new Date(),
        });

        loading.dismiss();
        this.showToast('Registro exitoso');
        this.router.navigate(['/login']);  // Redirigir al login después del registro
      })
      .catch((error) => {
        loading.dismiss();
        this.showToast('Error en el registro: ' + error.message);
      });
  }

  async registerWithGoogle() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando con Google...',
    });
    await loading.present();

    this.afAuth
      .signInWithPopup(new GoogleAuthProvider())
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log('Usuario registrado con Google:', user);

        // Guardar información en Firestore
        await this.firestore.collection('usuarios').doc(user?.uid).set({
          uid: user?.uid,
          email: user?.email,
          creado: new Date(),
          proveedor: 'Google',
        });

        loading.dismiss();
        this.showToast('Registro con Google exitoso');
        this.router.navigate(['/login']);  // Redirigir al login después del registro con Google
      })
      .catch((error) => {
        loading.dismiss();
        this.showToast('Error en el registro con Google: ' + error.message);
      });
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
    });
    toast.present();
  }


 goHome() {
    this.router.navigate(['/home']); // Redirige a la página de inicio
  }



  navigateToPlayerProfile() {
    this.router.navigate(['Jugadores']); // Navega a la ruta 'playerProfile'
  }


  navigateToPlayerProfile1() {
    this.router.navigate(['crearJugador']); // Navega a la ruta 'playerProfile'
  }





  navigateManager(){
    this.router.navigate(['playerDetail']); // Navega a la ruta 'playerProfile'

  }

 navigateToClubes() {
    this.router.navigate(['clubes']); // Navega a la ruta 'playerProfile'
  }


 navigateToClubes1() {
    this.router.navigate(['clubAgregar']); // Navega a la ruta 'playerProfile'
  }



 navigateToDt() {
    this.router.navigate(['dts']); // Navega a la ruta 'playerProfile'
  }


navigateToDt1() {
    this.router.navigate(['dtAgregar']); // Navega a la ruta 'playerProfile'
  }




   navigateToRegister() {
    this.router.navigate(['register']); // Navega a la ruta 'playerProfile'
  }


    goToManagerAgregar() {
    this.router.navigate(['/managerAgregar']);
  }




}
