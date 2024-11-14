import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [HeaderComponent,SidebarComponent,HeaderComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

}
