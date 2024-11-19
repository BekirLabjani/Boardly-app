import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { LetterAComponent } from './letters/letter-a/letter-a.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, LetterAComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
