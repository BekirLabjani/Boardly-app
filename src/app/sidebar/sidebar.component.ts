import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'boxicons'
import { SidebarService } from '../service/side-bar-service.service';
import { CommonModule } from '@angular/common';
import { DutyRosterComponent } from "../duty-roster/duty-roster.component";


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  

}