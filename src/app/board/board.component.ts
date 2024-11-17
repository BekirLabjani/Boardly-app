import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { Firestore, collection, query, where, getDocs,updateDoc,doc } from '@angular/fire/firestore';
import { Task } from '../models/task';
import { TaskService } from '../service/taskservie.service';



@Component({
  selector: 'app-board',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss', 'taskscomponent.scss']
})
export class BoardComponent implements OnInit {
  tasks: Task[] = [];
  todoTasks: Task[] = [];  // Aufgaben, die im "To Do"-Status sind
  inProgressTasks: Task[] = []; 
  awaitFeedBack: Task[] = []; 

  constructor(private firestore: Firestore, private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks(); // Lade Aufgaben beim Initialisieren des Components
  }
  async loadTasks() {
    this.tasks = await this.taskService.getTasks();  // Alle Aufgaben holen
    console.log('All tasks:', this.tasks);

    // Filtern der Aufgaben basierend auf ihrem Priority-Status
    this.todoTasks = this.tasks.filter(task => task.priority !== 'In Progress');
    this.inProgressTasks = this.tasks.filter(task => task.priority === 'In Progress');
    this.awaitFeedBack = this.tasks.filter(task => task.priority === 'Await FeedBack');
  }
}