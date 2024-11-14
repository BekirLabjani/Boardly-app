import { Component, Output, EventEmitter } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Task } from '../models/task'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [HeaderComponent,SidebarComponent,HeaderComponent ,FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  @Output() add: EventEmitter<boolean> = new EventEmitter();
  title = '';
  description = '';

  addNewTask() {

  }
}
