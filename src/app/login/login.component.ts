import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';  // Definir las propiedades para almacenar el email y la contraseña
  password: string = '';


  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  // Iniciar sesión con email y contraseña
  async loginWithEmail() {
    if (!this.email || !this.password) {
      this.showToast('Por favor ingresa el correo y la contraseña');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...'
    });
    await loading.present();

    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log('Sesión iniciada con email:', user);



        await loading.dismiss();
        this.showToast('Sesión iniciada exitosamente');
        this.router.navigate(['/home']);  // Redirigir a la página principal después del login
      })
      .catch(async (error) => {
        await loading.dismiss();
        this.showToast('Error al iniciar sesión: ' + error.message);
      });
  }

  // Iniciar sesión con Google
  async loginWithGoogle() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión con Google...'
    });
    await loading.present();

    this.afAuth.signInWithPopup(new GoogleAuthProvider())
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log('Sesión iniciada con Google:', user);

        await loading.dismiss();
        this.showToast('Sesión iniciada con Google exitosamente');
        this.router.navigate(['/home']);
      })
      .catch(async (error) => {
        await loading.dismiss();
        this.showToast('Error al iniciar sesión con Google: ' + error.message);
      });
  }

  // Mostrar mensajes de Toast
  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
