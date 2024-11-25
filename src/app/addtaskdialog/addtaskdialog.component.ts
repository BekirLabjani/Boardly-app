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
import { MatDialog, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

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
    MatButtonModule,
    MatTooltipModule,
    MatListModule,
    CommonModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDialogActions,
  ],
    changeDetection: ChangeDetectionStrategy.OnPush,
providers: [provideNativeDateAdapter()],
templateUrl: './addtaskdialog.component.html',
styleUrls: ['./addtaskdialog.component.scss']
})
export class AddtaskdialogComponent {
  @Output() add: EventEmitter<boolean> = new EventEmitter();
  taskForm: FormGroup;
  successMessageVisible = false; // Flag für die Sichtbarkeit des Erfolgs-Divs

  title = '';
  description = '';

  task = {
    title: '',
    description: '',
    assignTo: '',
    duDate: '',
    priority: 'low',
    category: '',
    subTasks: [] as string[],
  };
  subtasks: string[] = []; // Liste der Unteraufgaben
  users = ['Anna', 'Peter', 'Max']; // Beispielnutzer


  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  foods: Categorys[] = [
    { value: 'user', viewValue: 'User' },
    { value: 'frontend', viewValue: 'Frontend' },
    { value: 'backend', viewValue: 'Backend' },
    { value: 'style', viewValue: 'Style' },
  ];

  
  value = ''; // Eingabewert für die Unteraufgabe


  constructor(
    private firestore: Firestore,
    private fb: FormBuilder,
    private auth: Auth , 
    private generalFunktionsService: GeneralFunktionsService,
    private dialogRef: MatDialogRef<AddtaskdialogComponent>, 
  ) 
  {
    this.taskForm = this.fb.group({
      title: ['', Validators.required], // Pflichtfeld
      description: ['', Validators.required],
      assignTo: [[], Validators.required],
      duDate: ['', Validators.required],
      priority: ['low', Validators.required], // Standardwert: 'low'
      category: ['', Validators.required],
      subTasks: this.fb.array([]), // Dynamische Subtasks
    });
  }
  

  async addNewTask() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
  
      try {
        // Erstelle die Aufgabe in Firestore
        const taskRef = await addDoc(collection(this.firestore, 'tasks'), {
          ...taskData, // Alle Formularfelder als Dokument hinzufügen
          status: 'todo', // Initialer Status der Aufgabe
          createdAt: new Date(), // Zeitstempel der Erstellung
        });

        console.log('Task successfully added to Firestore with ID:', taskRef.id);
  
        // Optionale Benutzerinformation, z.B. ein Hinweis auf Erfolg
        alert('Task successfully added!');
  
        // Zurücksetzen des Formulars
        this.taskForm.reset({
          title: '',
          description: '',
          assignTo: [],
          duDate: '',
          priority: 'low', // Standardwert wiederherstellen
          category: '',
          subTasks: [],
        });
  
        window.location.reload();  // Seite wird neu geladen

        this.onNoClick();
      } catch (error) {
        console.error('Error adding task to Firestore:', error);
        alert('An error occurred while adding the task. Please try again.');
      }
    } else {
      console.error('Form is invalid');
      alert('Please fill in all required fields correctly.');
    }
  }
  
  
  
  addSubtask(value: string) {
    if (value) {
      this.subTasks.push(this.fb.control(value));
    }
  }

  get subTasks(): FormArray {
    return this.taskForm.get('subTasks') as FormArray;
  }

  resetTaskForm() {
    this.task = {
      title: '',
      description: '',
      assignTo: '',
      duDate: '',
      priority: 'low', // Standardwert beibehalten
      category: '',
      subTasks: [],
    };
  }

  onNoClick() { 
    this.generalFunktionsService.closeAddTaskDialog(this.dialogRef);
  }


  getCategoryColor(category: string): string {
    switch (category) {
      case 'user': return '#4caf50'; // Grün
      case 'frontend': return '#123d11'; // Blau
      case 'backend': return '#ff9800'; // Orange
      case 'style': return '#9c27b0'; // Lila
      default: return '#cccccc'; // Grau (Standardfarbe)
    }
  }
  

}
