import { Component, Inject, Input} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-detail-dialog',
  templateUrl: './task-detail-dialog.component.html',
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
    this.subTasksStatus = Array(task.subTasks.length).fill(false);
  }

  saveChanges(): void {
    // Beispiel: Subtasks-Status speichern oder verarbeiten
    console.log('Updated Subtasks Status:', this.subTasksStatus);
    this.dialogRef.close({ updatedTask: this.task, subTasksStatus: this.subTasksStatus });
  }
}
