import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AddtaskdialogComponent } from '../addtaskdialog/addtaskdialog.component';
import { MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class GeneralFunktionsService {



  constructor(private router: Router,private dialog: MatDialog) { }

  openAddTaskDialog() {
    const dialogRef: MatDialogRef<AddtaskdialogComponent> = this.dialog.open(AddtaskdialogComponent, {});

    // Wenn das Dialogfenster geschlossen wird, wird das Ergebnis geloggt
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  closeAddTaskDialog(dialogRef: MatDialogRef<AddtaskdialogComponent>) {
    dialogRef.close();  // Schließt das Dialogfenster
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
