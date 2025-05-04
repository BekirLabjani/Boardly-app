import { Component, ElementRef, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from "../header/header.component";
import { GeneralFunktionsService } from '../service/general-funktions.service';
import { SidebarService } from '../service/side-bar-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {

  isSidebarActive: boolean = true;

  constructor(
    private sidebarService: SidebarService,
    private el: ElementRef
  ) { }

  intervalId: any;

  ngOnInit(): void {
    this.updateDateTime();
    this.intervalId = setInterval(() => this.updateDateTime(), 1000);
  }

  ngOnDestroy(): void {
    this.updateSidebarStyles();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateSidebarStyles() {
    const summaryMainElement = this.el.nativeElement.querySelector('.dashboard');
    if (this.isSidebarActive) {
      summaryMainElement.style.marginLeft = '250px';
      summaryMainElement.style.width = 'calc(100vw - 250px)';
    } else {
      summaryMainElement.style.marginLeft = '80px';
      summaryMainElement.style.width = 'calc(100vw - 80px)';
    }
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  updateDateTime() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const timeStr = now.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const dateEl = document.getElementById('current-date');
    const timeEl = document.getElementById('current-time');

    if (dateEl && timeEl) {
      dateEl.innerText = dateStr;
      timeEl.innerText = timeStr;
    }
  }
}