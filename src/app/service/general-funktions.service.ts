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

  }

  openAddTask() {

  }

  openContact(){

  }
}
