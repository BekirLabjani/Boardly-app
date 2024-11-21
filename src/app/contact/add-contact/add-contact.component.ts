import { Component, OnInit } from '@angular/core';
import { ContactComponent } from '../contact.component';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent implements OnInit {
  constructor(private contactComponent: ContactComponent){

  }

  ngOnInit(): void {
    
  }

  closeAddContact(){
    this.contactComponent.closeAddContact();
  }
}
