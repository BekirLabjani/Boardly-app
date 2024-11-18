import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  // BehaviorSubject stellt sicher, dass der aktuelle Wert immer verfügbar ist
  private sidebarStatus = new BehaviorSubject<boolean>(true); // Standardmäßig aktiv
  sidebarStatus$ = this.sidebarStatus.asObservable();

  // Methode, um den Zustand zu ändern
  toggleSidebar() {
    this.sidebarStatus.next(!this.sidebarStatus.value);
  }

  // Methode, um den aktuellen Zustand abzurufen
  getSidebarStatus() {
    return this.sidebarStatus.value;
  }
}