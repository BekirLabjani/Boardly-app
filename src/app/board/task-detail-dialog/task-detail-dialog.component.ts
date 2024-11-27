import { AfterViewInit, Component, Inject, Input, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../models/task';
import { MatFormField } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EditdialogComponent } from '../../addtaskdialog/editdialog/editdialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Importiere beide Module



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
     CommonModule,
    FormsModule,        // FormsModule für ngModel
    ReactiveFormsModule 
    ],
  styleUrls: ['./task-detail-dialog.component.scss'],
})
export class TaskDetailDialogComponent implements AfterViewInit {
  tasks: Task[] = [];
  // Array zum Verwalten des Status der Subtasks (true/false)
  subTasksStatus: boolean[] = [];
  

  constructor(
    private dialog: MatDialog, 
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private dialogRef: MatDialogRef<TaskDetailDialogComponent>
  ) {
    // Initialisiere den Status basierend auf den vorhandenen Subtasks
    // this.subTasksStatus = Array(this.task.subTasks.length).fill(false);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  saveChanges(): void {
    // Beispiel: Subtasks-Status speichern oder verarbeiten
    console.log('Updated Subtasks Status:', this.subTasksStatus);
    // this.dialogRef.close({ updatedTask: this.task, subTasksStatus: this.subTasksStatus });
  }

  subTaskCompleted(i: any){
    this.subTasksStatus[i] = true;
  }

  setCheckedToInput(){
    let content = document.getElementById('content');
    do {
      for (let i = 0; i < this.subTasksStatus.length; i++) {
        const subTask = this.subTasksStatus[i];
        let input = document.getElementById(`subTaskInput${i}`) as HTMLInputElement;
        if(subTask == true){
          input.checked = true;
        }
      }
    } while (content);
  }

  openEditDialog(task: Task) {
    //this.setCheckedToInput();
    const dialogRef = this.dialog.open(EditdialogComponent, { data: task });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result?.updatedTask) {
        const index = this.tasks.findIndex(t => t.id === result.updatedTask.id);
        if (index > -1) {
          this.tasks[index] = result.updatedTask;
        }
      }
    });
  }
}
