import { Component } from '@angular/core';
import { IFightData } from '../../models/IFightData';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OddsService } from '../../services/odds.service';
import { log } from 'console';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  event?: IFightData

  constructor(private dataService: DataService,private oddsService: OddsService , private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const title = params.get('title');
      if (title) {
        this.loadEvent(title)
        this.loadOdds()
      }
    })
 }

 private loadEvent(title: string) {
  this.dataService.displayAllData().subscribe({
    next: (response: any) => {
      this.event = response.data.find((e: IFightData) => e.title === title)
    }
  })
 }

 private loadOdds() {
  this.oddsService.displayOddsData().subscribe({
    next: (response: any) => {
      console.log('Complete odds: ', response);
      
    }
  })
 }
}
