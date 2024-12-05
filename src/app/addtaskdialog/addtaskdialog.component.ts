import { Component, Output, EventEmitter, OnInit } from '@angular/core';
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
import {MatPseudoCheckbox, provideNativeDateAdapter} from '@angular/material/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { Categorys } from '../models/categorys';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { GeneralFunktionsService } from '../service/general-funktions.service';
import { MatDialog, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../service/taskservie.service';
import { SubtaskService } from '../service/subservice.service';


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
export class AddtaskdialogComponent implements OnInit {
  @Output() add: EventEmitter<boolean> = new EventEmitter();
  taskForm: FormGroup;
  successMessageVisible = false; // Flag für die Sichtbarkeit des Erfolgs-Divs
  subTasksStatus: boolean[] = []; // Array zur Verwaltung des Status

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
  users = ['Anna Schulz', 'Peter Pan', 'Max Muster']; // Beispielnutzer

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
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private auth: Auth , 
    private taskService: TaskService,
    private subtaskService: SubtaskService,
    private generalFunktionsService: GeneralFunktionsService,
    private dialogRef: MatDialogRef<AddtaskdialogComponent>, 
  ) 
  {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]], 
      description: ['', [Validators.required, Validators.maxLength(100)]], // Maximal 500 Zeichen
      assignTo: [[], Validators.required],
      duDate: ['', Validators.required],
      priority: ['low', Validators.required], // Standardwert: 'low'
      category: ['', Validators.required],
      subTasks: this.fb.array([]), // Dynamische Subtasks
    });
  }

  ngOnInit(): void {
    this.initializeSubTaskStatus();
  }

  initializeSubTaskStatus() {
    // Initialisiere den Status basierend auf der Anzahl der SubTasks
    this.subTasksStatus = new Array(this.subTasks.length).fill(false);
  }

  async addNewTask() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
  
      // SubTasks müssen als Array von Objekten gespeichert werden
      const subTasksArray = this.subTasks.controls.map(control => ({
        title: control.value.title,
        completed: control.value.completed,
      }));
  
      try {
        const taskRef = await addDoc(collection(this.firestore, 'tasks'), {
          ...taskData,
          subTasks: subTasksArray,
          status: 'todo',
        });
  
        console.log('Task successfully added to Firestore with ID:', taskRef.id);
        this.snackBar.open('Task successfully added!', 'Close', {
          duration: 3000,
        });
  
        // Optional: Rücksetzen des Formulars nach erfolgreicher Speicherung
        this.taskForm.reset();
        this.subTasks.clear();
        this.onNoClick();
      } catch (error) {
        console.error('Error adding task to Firestore:', error);
        this.snackBar.open('An error occurred while adding the task. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    } else {
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 3000,
      });
    }
  }

  
  removeSubtask(index: number) {
    this.subTasks.removeAt(index);
  }

  updateSubtaskCompletion(index: number, completed: boolean) {
    const subTask = this.subTasks.at(index);
    if (subTask) {
      subTask.get('completed')?.setValue(completed);
    }
  }
  

  addSubtask(subtask: string): void {
    if (subtask.trim()) {
      this.subTasks.push(this.fb.group({ title: subtask.trim(), completed: false }));
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
