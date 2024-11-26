import { ChangeDetectionStrategy, Component, Inject,} from '@angular/core';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerActions, MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldControl, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { BoardComponent } from '../../board/board.component';


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
     MatFormField,
     MatInput,
     MatSelect,
     MatDatepicker,

  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  templateUrl: './editdialog.component.html',
  styleUrl: './editdialog.component.scss'
})
export class EditdialogComponent {
  editForm: FormGroup;

  constructor(
    public boardComponent : BoardComponent,
    private dialog: MatDialog,
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
    // this.boardComponent.largCardUpdate()
  }

  cancel() {
    this.dialogRef.close();
  }
}