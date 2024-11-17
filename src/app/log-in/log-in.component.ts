import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
// import { AngularFireAuth } from '@angular/fire/auth';
import { GoogleAuthProvider, UserCredential } from 'firebase/auth';
import { AuthService } from '../service/auth.service.spec';
import { Userdata } from '../models/userdata';
import { GeneralFunktionsService } from '../service/general-funktions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  
  user: Userdata = {
    email: '',
    password: '',
  };
  
  userId: string | null = null;

  constructor(
    private afAuth: AuthService,
    private funkService: GeneralFunktionsService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    // Benutzer-ID aus der URL abrufen
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      console.log('User ID from URL:', this.userId);
      this.user.id = this.userId; // Optional: Benutzer-ID zuweisen
    }
  }

  login(): void {
    this.afAuth.login(this.user)
      .then(() => {
        // Login erfolgreich, Benutzer weiterleiten
        this.funkService.openSummary();
      })
      .catch((error) => {
        // Fehlerbehandlung
        console.error("Login failed:", error);
      });
  }

  
  
  
  googleSignIn() {
    
  }
  // guestLogIn() {
  //   this.funkService.openSummary();
  // }

  openSignUp(){
    this.funkService.openSignUp();
  }
  
}
