import { Component, OnInit } from '@angular/core';
import { ContactComponent } from '../contact.component';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss'
})
export class EditContactComponent implements OnInit {

  updatedData = {
    name: "contactComponent.contactName",
    email: "contactComponent.contactEmail",
    phone: "contactComponent.phone"
  }

  constructor(public contactComponent: ContactComponent){
  }

  ngOnInit(): void {
    
  }

  saveEdittedContact(){
    // let id: string = document.getElementById('contact.id');
    // this.contactComponent.updateContact(id: String, this.updatedData: Contact);
  }


  closeEditContact(){
    this.contactComponent.closeEditContact();
  }
}
