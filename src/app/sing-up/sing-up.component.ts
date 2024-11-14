import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { GeneralFunktionsService } from '../service/general-funktions.service';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss'
})
export class SingUpComponent {

constructor(private af: Auth, private generFunk: GeneralFunktionsService){}


  register(value: string) {

  }
  

  regist(value: any) {
    createUserWithEmailAndPassword(this.af, value.email, value.password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Anzeigename des Benutzers hinzufügen
        updateProfile(user, {
          displayName: value.name  // 'value.name' ist der Name, den der Benutzer im Formular eingegeben hat
        }).then(() => {
          // Anzeige des displayName im Console-Log
          console.log('User displayName:', user.displayName);
          alert('User successfully added with display name');
        }).catch((error) => {
          console.error('Error updating profile:', error);
        });
      })
      .catch((error) => {
        console.error('Error signing up:', error);

      });
      this.generFunk.openLogIn();
  }

}
