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
  loginError = false;
  guest = { email: '', password: '' };
  savedUsers = [{ email: '', password: ''}];
  rememberMe = false;

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
     // Prüfen, ob "Remember Me" aktiviert war
  const rememberMeStatus = localStorage.getItem('checked');
  this.rememberMe = rememberMeStatus === 'true';
    if(this.rememberMe){
      let email: any = document.getElementById('email');
      let password: any = document.getElementById('password');
      this.getLocalStorage();
      this.user.email = this.savedUsers[0].email;
      this.user.password = this.savedUsers[0].password;
    }
  }

  login(guest: any): void {
    if(guest){
      guest = this.user;
    }
    this.afAuth.login(this.user)
      .then(() => {
        this.loginError = false;
        // Login erfolgreich, Benutzer weiterleiten
        this.funkService.openSummary();
      })
      .catch((error) => {
        this.loginError = true;
        // Fehlerbehandlung
        console.error("Login failed:", error);
      });
  }

  guestLogin(){
    this.user.email = 'guest@guestmail.de';
    this.user.password = 'guest12345guest';
    this.login(this.user);
  }

  
  
  
  googleSignIn() {
    
  }
  // guestLogIn() {
  //   this.funkService.openSummary();
  // }

  openSignUp(){
    this.funkService.openSignUp();
  }

  checkedFunction() {
    let checkBox: any = document.getElementById("myCheck");
    if (checkBox.checked == true) {
      this.rememberMe = true;
      localStorage.setItem('checked', 'true');
      this.saveUserToLocalStorage();
    } else if(!checkBox.checked){
      localStorage.setItem('checked', 'false');
      this.rememberMe = false;
    }
  }

  saveUserToLocalStorage() {
    let email: any = document.getElementById('email');
    let password: any = document.getElementById('password');
    this.savedUsers = [{
      email: email.value,
      password: password.value,
    }];
    localStorage.setItem("savedUsers", JSON.stringify(this.savedUsers));
  }

  /**
   * Retrieves data from localStorage.
   */
   getLocalStorage() {
    let textInArray: any = localStorage.getItem("savedUsers");
    this.savedUsers = JSON.parse(textInArray);
  }

  onRememberMeChange(): void {
    if (this.rememberMe) {
      localStorage.setItem('rememberMe', 'true');
      this.saveUserToLocalStorage();
    } else {
      localStorage.setItem('rememberMe', 'false');
      localStorage.removeItem('savedUsers');
    }
  }
  
}
