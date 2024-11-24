import { Component, ElementRef, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { LetterAComponent } from './letters/letter-a/letter-a.component';
import { SidebarService } from '../service/side-bar-service.service';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Contact } from '../models/contact';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    LetterAComponent,
    EditContactComponent,
    AddContactComponent,
    FormsModule,
    CommonModule
],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  isSidebarActive: boolean = true;
  contactAdded: boolean = false;
  contacts: Contact[] = [];
  letters: string[] = [];
  initials: string[] = [];

  constructor(private sidebarService: SidebarService, private el: ElementRef, private firestore: Firestore) {}
  ngOnInit(): void {
    this.isSidebarActive = this.sidebarService.getSidebarStatus();
    this.updateSidebarStyles();

    this.sidebarService.sidebarStatus$.subscribe((status) => {
      this.isSidebarActive = status;
      this.updateSidebarStyles();
      this.loadContacts();
    });
  }

  async getContacts(): Promise<Contact[]> {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'contacts'));
  
      // Dokumente in das Task-Interface umwandeln und die ID hinzufügen
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),         // Alle Daten aus dem Dokument übernehmen
           // Dokument-ID hinzufügen
      } as Contact)); 
    } catch (error) {
      console.error('Error fetching tasks: ', error);
      return [];
    }
  }

  async loadContacts(){
    this.contacts = await this.getContacts();
    this.contacts.sort();
    console.log('All contacts:', this.contacts);
    this.getFirstLetter();
    this.getInitials();
  }

  getFirstLetter(){
    for (let i = 0; i < this.contacts.length; i++) {
      const contact = this.contacts[i].name;
      let letter = contact.charAt(0);
      if(!this.letters.includes(letter)){
        this.letters.push(letter);
      }
    }
  }

  getInitials(){
    for (let i = 0; i < this.contacts.length; i++){
      const name = this.contacts[i].name.split(' ');
      let firstInitial = name[0].charAt(0);
      if(name.length > 1){
        let secondInitial = name[1].charAt(0);
        let initial = firstInitial + secondInitial;
        this.initials.push(initial);
      } else {
        this.initials.push(firstInitial);
      }
    }
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

  animateAddedContact(){
    if (this.contactAdded) {
      setTimeout(() => {
        this.contactAdded = false;
      }, 2000);
    }
  }
}
