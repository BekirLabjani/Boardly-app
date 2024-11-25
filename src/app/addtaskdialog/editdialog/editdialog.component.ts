import { ChangeDetectionStrategy, Component, Inject,} from '@angular/core';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerActions, MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-editdialog',
  standalone: true,
  imports: [  
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatDatepicker,
    MatOption,
    MatSelect,
    MatDatepickerActions,
    MatDatepickerModule,
    MatDialogActions,
     ReactiveFormsModule,
     CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  templateUrl: './editdialog.component.html',
  styleUrl: './editdialog.component.scss'
})
export class EditdialogComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Formular mit übergebenen Daten initialisieren
    this.editForm = this.fb.group({
      title: [data.title, Validators.required],
      description: [data.description, Validators.required],
      duDate: [data.duDate, Validators.required],
      priority: [data.priority, Validators.required],
      assignTo: [data.assignTo, Validators.required],
    });
  }

  save() {
    if (this.editForm.valid) {
      // Schließe den Dialog und sende die aktualisierten Daten zurück
      this.dialogRef.close(this.editForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}