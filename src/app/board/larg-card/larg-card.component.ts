import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-larg-card',
  standalone: true,
  imports: [],
  providers: [DatePipe],  // Hier fügst du den DatePipe hinzu
  templateUrl: './larg-card.component.html',
  styleUrl: './larg-card.component.scss'
})
export class LargCardComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  public dialogRef: MatDialogRef<LargCardComponent>,) {}

}
