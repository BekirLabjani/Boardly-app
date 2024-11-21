import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SummaryComponent } from './summary/summary.component';
import { BoardComponent } from './board/board.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    { path: '', component: BoardComponent },
    { path: 'summary', component: SummaryComponent },
    { path: 'board', component: BoardComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'login', component: LogInComponent },
    { path: 'regist', component: SingUpComponent },
];
