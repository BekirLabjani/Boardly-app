import { Component, Inject, Input} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../models/task';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-task-detail-dialog',
  templateUrl: './task-detail-dialog.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatDialogActions,
    MatDialogContent,
    MatButtonModule,
    MatDialogModule,
    ],
  styleUrls: ['./task-detail-dialog.component.scss'],
})
export class TaskDetailDialogComponent {
  // Array zum Verwalten des Status der Subtasks (true/false)
  subTasksStatus: boolean[] = [];
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private dialogRef: MatDialogRef<TaskDetailDialogComponent>
  ) {
    // Initialisiere den Status basierend auf den vorhandenen Subtasks
    this.subTasksStatus = Array(this.task.subTasks.length).fill(false);
  }

  saveChanges(): void {
    // Beispiel: Subtasks-Status speichern oder verarbeiten
    console.log('Updated Subtasks Status:', this.subTasksStatus);
    this.dialogRef.close({ updatedTask: this.task, subTasksStatus: this.subTasksStatus });
  }
}
