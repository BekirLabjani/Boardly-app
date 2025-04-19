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

  navigateTo(event: Event, route: string) {
    event.preventDefault();
    this.router.navigateByUrl(route);
  }
  

  openPrivacyPolicy(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/privacypolicy');
  }

  openLegalNotice(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/legalnotice');
  }

  profileDropdownOpen = false;

toggleProfileDropdown(event: Event) {
  event.stopPropagation();
  this.profileDropdownOpen = !this.profileDropdownOpen;
}

editProfile(event: Event) {
  event.stopPropagation();
  this.profileDropdownOpen = false;
  // z. B. zur Profilseite navigieren:
  this.router.navigate(['/edit-profile']);
}

}