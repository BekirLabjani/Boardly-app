import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { GeneralFunktionsService } from '../service/general-funktions.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { User } from '../models/user-info';


@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [CommonModule,FormsModule,],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss'
})
export class SingUpComponent {
  user = new User();
constructor(private af: Auth, private generFunk: GeneralFunktionsService,private firestore: Firestore,){}


  register(value: string) {

  }
  

  async regist(value: { name: string; email: string; password: string }) {
    try {
      // 1. Register the user with email and password
      const userCredential = await createUserWithEmailAndPassword(this.af, value.email, value.password);
      const user = userCredential.user;
  
      // 2. Update the user's profile with their name
      await updateProfile(user, {
        displayName: value.name, // Name from the form
      });
  
      console.log('User displayName:', user.displayName);
  
      // 3. Save user information to Firestore
      await addDoc(collection(this.firestore, 'users'), {
        userName: value.name,
        email: value.email,
      });
  
      // Redirect or show login page
      this.generFunk.openLogIn();
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration. Please try again.');
    }
  }
  
}
