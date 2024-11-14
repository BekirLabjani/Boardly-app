import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Userdata } from '../models/userdata';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  login(userData: Userdata): Promise<void> 
  {
    return signInWithEmailAndPassword(this.auth, userData.email, userData.password).then(()=> {
      alert('funktioniert!!')
      this.router.navigate(['/']);
    })
  }
}
