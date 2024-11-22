import { Component, OnInit } from '@angular/core';
import { ContactComponent } from '../contact.component';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent implements OnInit {

  name: string = '';
  email: string = '';
  phone: string = '';

  constructor(private contactComponent: ContactComponent, private firestore: Firestore){

  }

  ngOnInit(): void {
    
  }

  async addContact(){
    try {
       // Aufgabe mit Status hinzufügen
       const contactRef = await addDoc(collection(this.firestore, 'contacts'),{
        name: this.name,
        email: this.email,
        phone: this.phone
       });
    } catch (error) {
      console.error('Error adding task to "tasks": ', error);
    }
    this.closeAddContact();
    this.contactComponent.contactAdded = true;
    this.contactComponent.animateAddedContact();
  }

  closeAddContact(){
    this.contactComponent.closeAddContact();
  }
}
