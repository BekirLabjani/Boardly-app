import { Component, ElementRef, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { Firestore, collection, query, where, getDocs,updateDoc,doc } from '@angular/fire/firestore';
import { Task } from '../models/task';
import { TaskService } from '../service/taskservie.service';
import { SidebarService } from '../service/side-bar-service.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddtaskdialogComponent } from '../addtaskdialog/addtaskdialog.component';
import { MAT_DIALOG_DATA, MatDialog,MatDialogActions,MatDialogClose,MatDialogContent,MatDialogRef,MatDialogTitle,} from '@angular/material/dialog';
import { GeneralFunktionsService } from '../service/general-funktions.service';
import { TaskComponent } from './task/task.component';
import { NgStyle } from '@angular/common';
import { TaskDetailDialogComponent } from './task-detail-dialog/task-detail-dialog.component';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
  SidebarComponent,
  MatIconModule,
  MatButtonModule,
  MatDividerModule, 
  MatTooltipModule,
  TaskComponent,
  NgStyle,
  FormsModule,
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss', 'taskscomponent.scss']
})
export class BoardComponent implements OnInit {
  isSidebarActive: boolean = true;
  isMobile: boolean = false;
  lastClickedTask: string | null = null;


  tasks: Task[] = [];
  todoTasks: Task[] = [];  // Aufgaben, die im "To Do"-Status sind
  inProgressTasks: Task[] = []; 
  awaitFeedBack: Task[] = []; 
  priority:  'low' | 'medium' | 'high' = 'low';
  assignTo: string = ''; 

  constructor(
    private firestore: Firestore,
    private taskService: TaskService,
    private sideService: SidebarService,
    private el: ElementRef,
    private dialog: MatDialog,
    private generalFunctions: GeneralFunktionsService,
    ) {
      this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    }

    ngOnInit(): void {
      this.isSidebarActive = this.sideService.getSidebarStatus();
      this.updateSidebarStyles();
      
      this.sideService.sidebarStatus$.subscribe(status => {
        this.isSidebarActive = status;
        this.updateSidebarStyles();
      });
      this.loadTasks(); // Lade Aufgaben beim Initialisieren des Components
    }


    async loadTasks() {
      try {
        this.tasks = await this.taskService.getTasks();
        console.log('All tasks:', this.tasks);
    
        this.todoTasks = this.tasks.filter(task => task.status === 'todo');
        // this.inProgressTasks = this.tasks.filter(task => task.status === 'in-progress');
        // this.awaitFeedBack = this.tasks.filter(task => task.status === 'await-feedback');
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
    
    
    
  openDialog() {
    this.generalFunctions.openAddTaskDialog();
    // Dialog öffnen mit Status
    console.log('test');
  }


    private updateSidebarStyles() {
    const summaryMainElement = this.el.nativeElement.querySelector('.board-container-page');
    if (this.isSidebarActive) {
      summaryMainElement.style.marginLeft = '250px';
      summaryMainElement.style.width = 'calc(100vw - 250px)';
    } else {
      summaryMainElement.style.marginLeft = '80px';
      summaryMainElement.style.width = 'calc(100vw - 80px)';
    }
  }


  toggleSidebar() {
    this.sideService.toggleSidebar();
  }

  handleClick(event: MouseEvent, task: any) {
    if (this.isMobile) {
      this.handleMobileClick(task);
    } else {
      this.openLargCard(task);
    }
  }

  handleMobileClick(task: any) {
    if (this.lastClickedTask === task.title) {
      // Zweiter Klick auf denselben Task
      console.log('der zweite klick');
      
      this.openLargCard(task);
      this.lastClickedTask = null; 
    } else {
   
      this.animateTask(task);
      this.lastClickedTask = task.title; 
      setTimeout(() => {
        this.lastClickedTask = null; 
      }, 300); 
    }
  }

  animateTask(task: any) {
    const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);
    if (taskElement) {
      taskElement.classList.add('animate');
      setTimeout(() => {
        taskElement.classList.remove('animate');
      }, 3000); 
    }
  }

  openLargCard(task: Task) {
    const dialogRef = this.dialog.open(TaskDetailDialogComponent, { data: task });
  
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