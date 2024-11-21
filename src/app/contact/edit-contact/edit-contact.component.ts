import { Component, OnInit } from '@angular/core';
import { ContactComponent } from '../contact.component';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss'
})
export class EditContactComponent implements OnInit {

  constructor(private contactComponent: ContactComponent){
  }

  ngOnInit(): void {
    
  }

  closeEditContact(){
    this.contactComponent.closeEditContact();
  }
}
