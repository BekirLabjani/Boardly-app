import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { Task } from '../../models/task';
import { MatFormField } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EditdialogComponent } from '../../addtaskdialog/editdialog/editdialog.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, isFormControl, ReactiveFormsModule } from '@angular/forms'; // Importiere beide Module
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from '@angular/fire/firestore';
import { MatList, MatListItem } from '@angular/material/list';
import { SubtaskService } from '../../service/subservice.service';
import { SubInterface } from '../../models/sub-interface';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddtaskdialogComponent } from '../../addtaskdialog/addtaskdialog.component';

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
    FormsModule, // FormsModule für ngModel
    ReactiveFormsModule,
    MatList,
    MatListItem,
    MatPseudoCheckboxModule,
    MatCheckboxModule,
    AddtaskdialogComponent,

  ],
  styleUrls: ['./task-detail-dialog.component.scss'],
})
export class TaskDetailDialogComponent implements OnInit  {
  tasks: Task[] = [];
  // @Input() task!: Task; // Task wird als Input übergeben
  subTasks: SubInterface[] = [];
  // Array zum Verwalten des Status der Subtasks (true/false)
  subTasksStatus: boolean[] = [];

  constructor(
    private subService: SubtaskService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private dialogRef: MatDialogRef<TaskDetailDialogComponent>,
    private firestore: Firestore
  ) {
    // Initialisiere den Status basierend auf den vorhandenen Subtasks
    // this.subTasksStatus = Array(this.task.subTasks.length).fill(false);
  }

  ngOnInit(): void {
    this.subService.subTasks$.subscribe((subTasks) => {
      if (subTasks && subTasks.length > 0) {
        this.subTasks = subTasks;
        this.subTasksStatus = new Array(subTasks.length).fill(false);
      } else {
        console.log('No subTasks available.');
      }
    });
  }
  
  trackBySubtaskId(index: number, subtask: SubInterface): string {
    return subtask.title; // oder eine andere eindeutige Kennung
  }
  
  ngAfterViewInit(): void {}

  saveChanges(): void {
    // Beispiel: Subtasks-Status speichern oder verarbeiten
    console.log('Updated Subtasks Status:', this.subTasksStatus);
    // this.dialogRef.close({ updatedTask: this.task, subTasksStatus: this.subTasksStatus });
  }

  openEditDialog(task: Task) {
    //this.setCheckedToInput();
    const dialogRef = this.dialog.open(EditdialogComponent, { data: task });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.updatedTask) {
        const index = this.tasks.findIndex(
          (t) => t.id === result.updatedTask.id
        );
        if (index > -1) {
          this.tasks[index] = result.updatedTask;
        }
      }
    });
  }

}
