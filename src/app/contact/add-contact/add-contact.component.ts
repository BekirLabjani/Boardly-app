import { Component, OnInit } from '@angular/core';
import { ContactComponent } from '../contact.component';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss',
})
export class AddContactComponent implements OnInit {
  name: string = '';
  email: string = '';
  phone: string = '';
  color: string = '';

  constructor(
    private contactComponent: ContactComponent,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {}

  async addContact() {
    try {
      this.randomColor();
      // Aufgabe mit Status hinzufügen
      const contactRef = await addDoc(collection(this.firestore, 'contacts'), {
        name: this.name,
        email: this.email,
        phone: this.phone,
        color: this.color,
      });
    } catch (error) {
      console.error('Error adding task to "tasks": ', error);
    }
    this.closeAddContact();
    this.contactComponent.contactAdded = true;
    this.contactComponent.animateAddedContact();
  }

  randomColor() {
    const colors = [
      '#FF0000', // Rot
      '#00FF00', // Grün
      '#0000FF', // Blau
      '#FFFF00', // Gelb
      '#FF00FF', // Magenta
      '#00FFFF', // Cyan
      '#FF4500', // Orangerot
      '#008000', // Dunkelgrün
      '#00008B', // Dunkelblau
      '#FFD700', // Goldgelb
      '#8A2BE2', // Blauviolett
      '#DC143C', // Karmesinrot
      '#00BFFF', // Tiefes Himmelblau
      '#FF1493', // Tiefrosa
      '#4B0082', // Indigo
    ];

    let i = Math.floor(Math.random() * colors.length);
    this.color = colors[i];
  }

  closeAddContact() {
    this.contactComponent.closeAddContact();
  }
}
