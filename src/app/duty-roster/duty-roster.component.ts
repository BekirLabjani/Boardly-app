import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-duty-roster',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './duty-roster.component.html',
  styleUrls: ['./duty-roster.component.scss']  // ✅
})
export class DutyRosterComponent {

}
