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

  contactId = this.contactComponent.contactId;
  contactName = '';
  contactEmail = '';
  contactPhone = '';

  updatedData = {
    id: this.contactId,
    name: '',
    email: '',
    phone: ''
  }

  constructor(public contactComponent: ContactComponent){
  }

  ngOnInit(): void {
    
  }

  getValuesOfInputs(){
    let name = document.getElementById('input-name') as HTMLInputElement;
    this.updatedData.name = name.value;
    let email = document.getElementById('input-email') as HTMLInputElement;
    this.updatedData.email = email.value;
    let phone = document.getElementById('input-phone') as HTMLInputElement;
    this.updatedData.phone = phone.value;
  }

  saveEdittedContact(){
    this.getValuesOfInputs();
    console.log(this.updatedData);
    console.log(this.contactComponent.contactId);
    this.contactComponent.updateContact(this.contactComponent.contactId, this.updatedData);
    this.closeEditContact();
    this.contactComponent.reloadPage();
  }

  deleteContact(ID: any){
    this.contactComponent.deleteContact(ID);
    this.closeEditContact();
    this.contactComponent.reloadPage();
  }


  closeEditContact(){
    this.contactComponent.closeEditContact();
  }
}
