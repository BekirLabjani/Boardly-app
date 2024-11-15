import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeneralFunktionsService {

  constructor(private router: Router) { }

  openSummary() {
    this.router.navigateByUrl('/summary')
  }

  openBoard(){
    this.router.navigateByUrl('/summary')
  }

  openAddTask() {
    this.router.navigateByUrl('/summary')
  }

  openContact(){
    this.router.navigateByUrl('/summary')
  }

  openLogIn(){
    this.router.navigateByUrl('/login')
  }

  openSignUp(){
    this.router.navigateByUrl('/regist');
  }
}
