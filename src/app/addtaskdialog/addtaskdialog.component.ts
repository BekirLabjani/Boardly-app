import { Component, Output, EventEmitter } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Task } from '../models/task'; 
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { Categorys } from '../models/categorys';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { GeneralFunktionsService } from '../service/general-funktions.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-addtaskdialog',
  standalone: true,
  imports: [  
    FormsModule,
    RouterModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatListModule,
    CommonModule,
    MatRadioModule,
  ],
    changeDetection: ChangeDetectionStrategy.OnPush,
providers: [provideNativeDateAdapter()],
templateUrl: './addtaskdialog.component.html',
styleUrls: ['./addtaskdialog.component.scss']
})
export class AddtaskdialogComponent {
  @Output() add: EventEmitter<boolean> = new EventEmitter();
  title = '';
  description = '';

  task = {
    title: '',
    description: '',
    assignTo: '',
    duDate: '',
    priority: '',
    category: '',
    subTasks: [] as string[],
  };
  subtasks: string[] = []; // Liste der Unteraufgaben
  users = ['Anna', 'Peter', 'Max']; // Beispielnutzer


  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  foods: Categorys[] = [
    { value: 'user-1', viewValue: 'User' },
    { value: 'frontend-2', viewValue: 'Frontend' },
    { value: 'backend-3', viewValue: 'Backend' },
    { value: 'style-4', viewValue: 'Style' },
  ];
  value = ''; // Eingabewert für die Unteraufgabe


  constructor(private firestore: Firestore, private auth: Auth , private generalFunktionsService: GeneralFunktionsService,    private dialogRef: MatDialogRef<AddtaskdialogComponent>, 
  ) {}


  async addNewTask() {
    try {
      // Aufgabe mit Status hinzufügen
      const taskRef = await addDoc(collection(this.firestore, 'tasks'), {
        title: this.task.title,
        description: this.task.description,
        assignTo: this.task.assignTo,
        duDate: this.task.duDate,
        priority: this.task.priority,
        category: this.task.category,
        subTasks: this.task.subTasks,
        status: 'todo', // Initialer Status der Aufgabe
        // userId: this.currentUserId, // optional: Benutzer-ID hinzufügen
        createdAt: new Date(),
      });
  
      console.log('Task added to "tasks" with ID: ', taskRef.id);
  
      // Event auslösen, um Änderungen im Frontend zu signalisieren
      // this.add.emit(true);
  
      // Formular zurücksetzen
      this.resetTaskForm();

    } catch (error) {
      console.error('Error adding task to "tasks": ', error);
    }
    window.location.reload();  // Seite wird neu geladen

    this.onNoClick();
  }
  
  
  addSubtask() {
    // Fügt die Unteraufgabe zur Liste hinzu
    if (this.value) {
      this.subtasks.push(this.value);
      this.value = ''; // Eingabefeld zurücksetzen
    }
  }


  resetTaskForm() {
    this.task = {
      title: '',
      description: '',
      assignTo: '',
      duDate: '',
      priority: '',
      category: '',
      subTasks: [],
    };
  }
  onNoClick() { 
    this.generalFunktionsService.closeAddTaskDialog(this.dialogRef);
  }

}
