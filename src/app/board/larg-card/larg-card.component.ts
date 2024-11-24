import { Component, Inject, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; // CommonModule für Pipes wie slice importieren

@Component({
  selector: 'app-larg-card',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatButtonModule,
    CommonModule, // CommonModule hinzugefügt
  ],
  providers: [DatePipe], // DatePipe als Provider registrieren
  templateUrl: './larg-card.component.html',
  styleUrl: './larg-card.component.scss',
})
export class LargCardComponent {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<LargCardComponent>
  ) {
    console.log(this.data);
  }
}
