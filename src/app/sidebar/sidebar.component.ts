import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private router: Router) {}

  openTask(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/addTask');
  }
  openCont(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/contact');
  }
  openBoard(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/board');
  }
  openSumm(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/summary');
  }
}
