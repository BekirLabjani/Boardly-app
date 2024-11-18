import { Component, ElementRef, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from "../header/header.component";
import { GeneralFunktionsService } from '../service/general-funktions.service';
import { SidebarService } from '../service/side-bar-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent,CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {

  isSidebarActive: boolean = true;

  constructor(
    private sidebarService: SidebarService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    // Initialen Zustand der Sidebar vom Service beziehen
    this.isSidebarActive = this.sidebarService.getSidebarStatus();
    this.updateSidebarStyles();
    
    // Abonniere Sidebar-Status-Änderungen
    this.sidebarService.sidebarStatus$.subscribe(status => {
      this.isSidebarActive = status;
      this.updateSidebarStyles();
    });
  }

  // Methode zum Ändern der Sidebar-Styles
  private updateSidebarStyles() {
    const summaryMainElement = this.el.nativeElement.querySelector('.summaryMain');
    if (this.isSidebarActive) {
      summaryMainElement.style.marginLeft = '250px';
      summaryMainElement.style.width = 'calc(100vw - 250px)';
    } else {
      summaryMainElement.style.marginLeft = '80px';
      summaryMainElement.style.width = 'calc(100vw - 80px)';
    }
  }

  // Toggle Sidebar aktivieren/deaktivieren
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}