import { Component } from '@angular/core';
import { IFightData } from '../../models/IFightData';
import { DataService } from '../../services/data.service';
import { CommonModule } from "@angular/common";
import { EventDetailsComponent } from '../event-details/event-details.component';
import { RouterModule, Router } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  events: IFightData[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.displayAllData().subscribe({
      next: (response: any) => {
        console.log('API response:', response);
        this.events = response.data;

        //Navigating to first event on page load
        if (this.events.length > 0) {
          this.router.navigate(['/event', this.events[0].title])
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
        
      }
    })
  }
}
