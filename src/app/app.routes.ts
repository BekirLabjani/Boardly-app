import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SummaryComponent } from './summary/summary.component';
import { BoardComponent } from './board/board.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { ContactComponent } from './contact/contact.component';
import { PrivacyPolicyComponent } from './shared/privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './shared/legal-notice/legal-notice.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TrashComponent } from './trash/trash.component';

export const routes: Routes = [
    { path: '', component: BoardComponent },
    { path: 'summary', component: SummaryComponent },
    { path: 'board', component: BoardComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'login', component: LogInComponent },
    { path: 'trash', component: TrashComponent },
    // { path: 'regist', component: SingUpComponent },
    // { path: 'privacypolicy', component: PrivacyPolicyComponent },
    // { path: 'legalnotice', component: LegalNoticeComponent }
];
