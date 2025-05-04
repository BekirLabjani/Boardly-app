import { Component, ElementRef, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { Firestore, collection, query, where, getDocs, updateDoc, doc } from '@angular/fire/firestore';
import { Task } from '../models/task';
import { TaskService } from '../service/taskservie.service';
import { SidebarService } from '../service/side-bar-service.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddtaskdialogComponent } from '../addtaskdialog/addtaskdialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';
import { GeneralFunktionsService } from '../service/general-funktions.service';
import { TaskComponent } from './task/task.component';
import { CommonModule, NgStyle } from '@angular/common';
import { TaskDetailDialogComponent } from './task-detail-dialog/task-detail-dialog.component';
import { FormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule } from '@angular/common/http';



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
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss', 'taskscomponent.scss']
})
export class BoardComponent implements OnInit {
  boards: any[] = [];
  todoTasks: any[] = [];


  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.http.get<any>('assets/datei.json').subscribe(data => {
      console.log('Geladene Daten:', data); // 👈 wichtig
      this.boards = data.boards;
    });
  }
  

  addBoardSection() {

  }

  handleClick() {

  }

  openDialog() {

  }
}