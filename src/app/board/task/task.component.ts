import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// SubTask Interface Definition
interface SubTask {
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgClass, MatProgressBarModule,],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'], // Fix: `styleUrls` statt `styleUrl`
})
export class TaskComponent {
  @Input() category: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() assignTo: string[] = [];
  @Input() subTasks: SubTask[] = []; // SubTask Array als Input
  @Input() priority: 'low' | 'medium' | 'high' = 'medium'; // Standardwert

  // Berechnung des Fortschritts basierend auf abgeschlossenen SubTasks
  calculateProgress(): number {
    if (!this.subTasks || this.subTasks.length === 0) return 50;
    const completedTasks = this.subTasks.filter(task => task.completed).length;
    return (completedTasks / this.subTasks.length) * 100;
  }
}
