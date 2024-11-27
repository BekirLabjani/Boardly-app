import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'boxicons'
import { SidebarService } from '../service/side-bar-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  isSidebarActive: boolean = true; // Standardmäßig aktiv

  constructor(private router: Router, private sidebarService: SidebarService) {
    // Initialisiere den Sidebar-Zustand beim Laden der Komponente
    this.sidebarService.sidebarStatus$.subscribe(status => {
      this.isSidebarActive = status;
    });
  }

  // Toggle Sidebar aktivieren/deaktivieren
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  // Navigationsmethoden
  openTask(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/addTask');
  }

  openCont(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/contact');
  }

  openBoard(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/board');
  }

  openSumm(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/summary');
  }

  openPrivacyPolicy(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/privacypolicy');
  }
}