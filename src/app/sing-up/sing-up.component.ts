import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { GeneralFunktionsService } from '../service/general-funktions.service';
import { User } from '../models/user-info';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [CommonModule, FormsModule], // CommonModule hier sicherstellen
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss',
})
export class SingUpComponent {
  user = new User();
  passwordMismatch = false;
  acceptPolicy = false;
  showSuccessMessage = false;

  constructor(
    private af: Auth,
    private generFunk: GeneralFunktionsService,
    private firestore: Firestore
  ) {}

  async regist(value: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    this.stopRegistrationIfChechboxIsNotChecked();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.af,
        value.email,
        value.password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: value.name });
      await addDoc(collection(this.firestore, 'users'), {
        userName: value.name,
        email: value.email,
      });
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
        this.openLogin(); // Umleiten oder weitere Logik
      }, 2000);
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration. Please try again.');
    }
  }

  stopRegistrationIfChechboxIsNotChecked() {
    if (!this.acceptPolicy) {
      return;
    }
  }

  validatePasswords() {
    const passwordInput = (
      document.getElementById('password') as HTMLInputElement
    )?.value;
    const confirmPasswordInput = (
      document.getElementById('confirmPasswordInput') as HTMLInputElement
    )?.value;
    this.passwordMismatch = passwordInput !== confirmPasswordInput;
  }

  openLogin() {
    this.generFunk.openLogIn();
  }

}
