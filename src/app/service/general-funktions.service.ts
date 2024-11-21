import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AddtaskdialogComponent } from '../addtaskdialog/addtaskdialog.component';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class GeneralFunktionsService {



  constructor(private router: Router,private dialog: MatDialog) { }

  openAddTaskDialog() {
    this.dialog.open(AddtaskdialogComponent, {});
  }


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
    this.router.navigateByUrl('/contact')
  }

  openLogIn(){
    this.router.navigateByUrl('/login')
  }

  openSignUp(){
    this.router.navigateByUrl('/regist');
  }
}
