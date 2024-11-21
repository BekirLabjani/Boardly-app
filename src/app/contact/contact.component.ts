import { Component, ElementRef, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { LetterAComponent } from './letters/letter-a/letter-a.component';
import { SidebarService } from '../service/side-bar-service.service';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { AddContactComponent } from './add-contact/add-contact.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    LetterAComponent,
    EditContactComponent,
    AddContactComponent
],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  isSidebarActive: boolean = true;

  constructor(private sidebarService: SidebarService, private el: ElementRef) {}
  ngOnInit(): void {
    this.isSidebarActive = this.sidebarService.getSidebarStatus();
    this.updateSidebarStyles();

    this.sidebarService.sidebarStatus$.subscribe((status) => {
      this.isSidebarActive = status;
      this.updateSidebarStyles();
    });
  }

  private updateSidebarStyles() {
    const contactMainElement = this.el.nativeElement.querySelector('.content');
    if (this.isSidebarActive) {
      contactMainElement.style.transform = 'translateX(0px)';
      contactMainElement.style.transition = 'transform 400ms ease-in-out';
    } else {
      contactMainElement.style.transform = 'translateX(-200px)';
    }
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  openEditContact(event: Event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Links
    let overlay = document.getElementById('overlay');
    overlay?.classList.remove('d-none');
  }

  closeEditContact() {
      const editContact = document.getElementById('edit-contact'); // Element holen
      const overlay = document.getElementById('overlay');
    
      // Nur wenn `editContact` existiert, die Animation starten
      editContact?.classList.add('slideOut');
    
      // Nach der Animation (500ms) das Overlay verstecken
      setTimeout(() => {
        overlay?.classList.add('d-none'); // Overlay verstecken
        editContact?.classList.remove('slideOut'); // Klasse entfernen
      }, 500);
  }

  openAddContact(event: Event){
    event.preventDefault(); // Verhindert das Standardverhalten des Links
    let overlay = document.getElementById('overlay-second');
    overlay?.classList.remove('d-none');
  }

  closeAddContact(){
    const addContact = document.getElementById('add-contact'); // Element holen
    const overlay = document.getElementById('overlay-second');

    addContact?.classList.add('slideOut');

    // Nach der Animation (500ms) das Overlay verstecken
    setTimeout(() => {
      overlay?.classList.add('d-none'); // Overlay verstecken
      addContact?.classList.remove('slideOut'); // Klasse entfernen
    }, 500);
  }
}
