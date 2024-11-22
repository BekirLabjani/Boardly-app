import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgClass,MatProgressBarModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})


export class TaskComponent {
  @Input() category: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() subTasks: string[] = [];
  @Input() priority: 'low' | 'medium' | 'high' = 'medium'; // Standardwert


  constructor() { }

}
