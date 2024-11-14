import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss'
})
export class SingUpComponent {
constructor(private af: Auth){}


  register(value: string) {

  }
  

  regist(value:any) {
    createUserWithEmailAndPassword(this.af, value.email, value.password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert('hinzugefügt')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }
}
