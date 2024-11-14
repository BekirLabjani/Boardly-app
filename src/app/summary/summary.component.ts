import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
// TypeScript
// Sicherstellen, dass das DOM geladen ist, bevor wir auf Elemente zugreifen



}
