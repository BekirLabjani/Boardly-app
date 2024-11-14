import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
// import { AngularFireAuth } from '@angular/fire/auth';
import { GoogleAuthProvider, UserCredential } from 'firebase/auth';
import { AuthService } from '../service/auth.service.spec';
import { Userdata } from '../models/userdata';
import { GeneralFunktionsService } from '../service/general-funktions.service';
@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  
  user: Userdata ={
    email: '',
    password: '',
  };
  
  loginData = {
    name: '',
    email: '',
    message: '',
  };

  constructor(private afAuth: AuthService, private funkService: GeneralFunktionsService) {}

  onSubmit(ngForm: NgForm) {
    // Logik zur Verarbeitung des Login-Formulars
  }

  login():void {

    this.afAuth.login(this.user)

  }
  googleSignIn() {
    
  }
  guestLogIn() {
    this.funkService.openSummary();
  }
}
