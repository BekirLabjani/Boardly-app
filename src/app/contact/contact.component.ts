import { Component, ElementRef, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { LetterAComponent } from './letters/letter-a/letter-a.component';
import { SidebarService } from '../service/side-bar-service.service';
import { EditContactComponent } from './edit-contact/edit-contact.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, LetterAComponent, EditContactComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  isSidebarActive: boolean = true;

  constructor(
    private sidebarService: SidebarService,
    private el: ElementRef
  )
    {}
    ngOnInit(): void {
      this.isSidebarActive = this.sidebarService.getSidebarStatus();
      this.updateSidebarStyles();
      
      this.sidebarService.sidebarStatus$.subscribe(status => {
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
}
