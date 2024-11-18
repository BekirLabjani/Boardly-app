import { Component, Output, EventEmitter } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Task } from '../models/task'; 
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FormsModule, RouterModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  @Output() add: EventEmitter<boolean> = new EventEmitter();
  title = '';
  description = '';
  task: Task = {
    title: '',
    description: '',
    assignTo: '',
    duDate: '',
    priority: '',
    category: '',
    subTasks: ''
  };

  constructor(private firestore: Firestore, private auth: Auth) {}

  async addNewTask() {
    try {
      // Add the new task to the Firestore collection
      const taskRef = await addDoc(collection(this.firestore, 'tasks'), {
        title: this.task.title,
        description: this.task.description,
        assignTo: this.task.assignTo,
        duDate: this.task.duDate,
        priority: this.task.priority,
        category: this.task.category,
        subTasks: this.task.subTasks,
        createdAt: new Date(),
      });

      console.log('Task added with ID: ', taskRef.id);

      // Emit event after task is added
      this.add.emit(true);

      // Reset the form fields
      this.resetTaskForm();

    } catch (error) {
      console.error('Error adding task: ', error);
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
      subTasks: ''
    };
  }
}
