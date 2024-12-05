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
  deleteDoc,
} from '@angular/fire/firestore';
import { MatList, MatListItem } from '@angular/material/list';
import { SubtaskService } from '../../service/subservice.service';
import { SubInterface } from '../../models/sub-interface';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddtaskdialogComponent } from '../../addtaskdialog/addtaskdialog.component';
import { Injectable } from '@angular/core';
import { TaskService } from '../../service/taskservie.service';
import { Timestamp } from '@angular/fire/firestore';

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
  subTasksStatus: boolean[] = []; // Instanzvariable für den Status der Subtasks


  constructor(
    private subService: SubtaskService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private dialogRef: MatDialogRef<TaskDetailDialogComponent>,
    private firestore: Firestore,
    private taskService: TaskService // Hinzugefügt
  ) {
    // Initialisiere den Status basierend auf den vorhandenen Subtasks
    // this.subTasksStatus = Array(this.task.subTasks.length).fill(false);
  }
  ngOnInit(): void {
    // Initialisiere subTasksStatus mit dem aktuellen completed-Status der Subtasks
    this.subTasksStatus = this.task.subTasks.map(subtask => subtask.completed);
  }
  
  
  trackBySubtaskId(index: number, subtask: SubInterface): string {
    return subtask.title; // oder eine andere eindeutige Kennung
  }

  getFormattedDate(duDate: string | Timestamp | undefined): string {
    if (!duDate) return 'No due date'; // Rückgabe für undefinierte oder leere Werte
  
    // Wenn du ein Timestamp hast
    if (duDate instanceof Timestamp) {
      const date = new Date(duDate.seconds * 1000);
      return date.toLocaleDateString();
    }
  
    // Wenn du einen ISO-String hast (z.B. "2024-12-05T00:00:00.000Z")
    if (typeof duDate === 'string') {
      const date = new Date(duDate);
      return date.toLocaleDateString();
    }
  
    return 'Invalid date';
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

  updateSubtaskCompletion(index: number, isCompleted: boolean): void {
    this.subTasksStatus[index] = isCompleted;
    this.task.subTasks[index].completed = isCompleted; 

    this.saveTask().then(() => {
    }).catch((error) => {
      console.error('Error updating subtask in Firestore:', error);
    });
  }
  
  async deleteTask(): Promise<void> {
    try {
      const taskRef = doc(this.firestore, 'tasks', this.task.id);
      await deleteDoc(taskRef);
      console.log('Task deleted successfully');

      // Schließe den Dialog, nachdem der Task gelöscht wurde
      this.dialogRef.close();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }
  
  
  getInitials(name: string): string {
    if (!name) return ''; 
    const names = name.split(' ');
    const initials = names
      .map((part) => part.charAt(0).toUpperCase()) 
      .slice(0, 2) 
      .join('');
    return initials;
  }
  
  async saveTask() {
    try {
      // Aktualisiere die Subtasks in der Task-Objekt
      this.task.subTasks = this.task.subTasks.map((subtask, index) => {
        return {
          ...subtask,
          completed: this.subTasksStatus[index] // Setze den `completed`-Status von `subTasksStatus`
        };
      });
  
      // Speichere die Task in Firestore
      const taskRef = doc(this.firestore, 'tasks', this.task.id);
      await updateDoc(taskRef, {
        subTasks: this.task.subTasks,
      });
  
      console.log('Task updated successfully');
    } catch (error) {
      console.error('Error updating task in Firestore:', error);
    }
  }
  
  
}
