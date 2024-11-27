import { Component, OnInit, Input } from '@angular/core';
import { ContactComponent } from '../../contact.component';
import { Contact } from '../../../models/contact';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-letter-a',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './letter-a.component.html',
  styleUrl: './letter-a.component.scss',
})
export class LetterAComponent implements OnInit {
  @Input() name: string = '';
  @Input() email: string = '';
  @Input() phone: string = '';
  @Input() letter: string = '';
  @Input() initial: any = '';
  @Input() color: any = '';
  constructor(private contactComponent: ContactComponent) {
  }

  ngOnInit(): void {
  }

  // getLetterOfSurename(){
  //   for (let i = 0; i < this.contactComponent.contacts.length; i++) {
  //     const name = this.contactComponent.contacts[i].name;
  //     let surename = name.split('')[1];
  //     this.surenameLetters.push(surename);
  //   }
  // }
}
