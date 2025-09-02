import { Component } from '@angular/core';
import { IFightData } from '../../models/IFightData';
import { DataService } from '../../services/data.service';
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  events: IFightData[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.displayAllData().subscribe({
      next: (response: any) => {
        console.log('API response:', response);
        this.events = response.data;
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
