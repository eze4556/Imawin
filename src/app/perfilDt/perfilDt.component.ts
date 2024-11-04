import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-perfilDt',
  templateUrl: './perfilDt.component.html',
  styleUrls: ['./perfilDt.component.css']
})
export class PerfilDtComponent implements OnInit {

  dtProfile: any;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    const dtId = this.route.snapshot.paramMap.get('id');
    if (dtId) {
      this.firestore.collection('dt').doc(dtId).valueChanges().subscribe(profile => {
        this.dtProfile = profile;
      });
    }
  }



async shareProfile() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Compartir en:',
    buttons: [
      {
        text: 'Twitter',
        icon: 'logo-twitter',
        handler: () => {
          this.shareOnSocial('twitter');
        }
      },
      {
        text: 'Facebook',
        icon: 'logo-facebook',
        handler: () => {
          this.shareOnSocial('facebook');
        }
      },
      {
        text: 'LinkedIn',
        icon: 'logo-linkedin',
        handler: () => {
          this.shareOnSocial('linkedin');
        }
      },
      {
        text: 'WhatsApp',
        icon: 'logo-whatsapp',
        handler: () => {
          this.shareOnSocial('whatsapp');
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Compartir cancelado');
        }
      }
    ]
  });

  await actionSheet.present();
}

shareOnSocial(platform: string) {
  const profileUrl = window.location.href;
  const text = `Perfil del Director Técnico ${this.dtProfile.playerName}`;

  let shareUrl = '';

  switch (platform) {
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(profileUrl)}`;
      break;
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;
      break;
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}%20${encodeURIComponent(profileUrl)}`;
      break;
    default:
      console.error('Plataforma no soportada');
      return;
  }

  window.open(shareUrl, '_blank');
}



contact() {
  const subject = `Contacto para el DT ${this.dtProfile.playerName}`;
  const body = `Hola ${this.dtProfile.playerName},\n\nEstoy interesado en contactarte.`;
  window.location.href = `mailto:email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}






}
