import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SummaryComponent } from './summary/summary.component';
import { BoardComponent } from './board/board.component';
import { AddTaskComponent } from './add-task/add-task.component';

export const routes: Routes = [
    { path: '', component: LogInComponent },
];
