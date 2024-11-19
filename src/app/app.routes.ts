import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SummaryComponent } from './summary/summary.component';
import { BoardComponent } from './board/board.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    { path: '', component: AddTaskComponent },
    { path: 'summary', component: SummaryComponent },
    { path: 'board', component: BoardComponent },
    { path: 'addTask', component: AddTaskComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'login', component: LogInComponent },
    { path: 'regist', component: SingUpComponent },
];
