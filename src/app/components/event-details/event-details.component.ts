import { Component } from '@angular/core';
import { IFight, IFightData, IFightWithOdds } from '../../models/IFightData';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OddsService } from '../../services/odds.service';
import { log } from 'console';
import { IOddsData } from '../../models/IOddsData';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  event?: IFightWithOdds;
  odds?: IOddsData[];

  constructor(private dataService: DataService,private oddsService: OddsService , private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const title = params.get('title');
      if (title) {
        this.loadEvent(title)
        this.loadEventWithOdds(title)
      }
    })
 }

  normalizeName(name:string): string {
  return name.toLowerCase().trim()
 }

 private loadEvent(title: string) {
  this.dataService.displayAllData().subscribe({
    next: (response: any) => {
      this.event = response.data.find((e: IFightData) => e.title === title)
    }
  })
 }

 private loadEventWithOdds(title: string) {
  forkJoin({
    events: this.dataService.displayAllData(),
    odds: this.oddsService.displayOddsData()
  }).subscribe({
    next: ({events, odds}) => {
      console.log('Events: ', events);
      console.log('Odds: ', odds);
      

      const selectedEvent = events.data.find((e:IFightData) => e.title === title); 

      if (selectedEvent) {
        this.event = {
          ...selectedEvent,
          fights: selectedEvent.fights.map((fight: IFight) => {
            const fightOdds = odds.find(
              (o: IOddsData) => 
                this.normalizeName(o.home_team) === this.normalizeName(fight.fighterA.name) &&
                this.normalizeName(o.away_team) === this.normalizeName(fight.fighterB.name)
            );
            return { ...fight, odds: fightOdds 
              ? {home: fightOdds.bookmakers[0]?.markets[0]?.outcomes[0]?.price ?? null,
                 away: fightOdds.bookmakers[0]?.markets[0]?.outcomes[1]?.price ?? null
            } : null
          }
          })
        }
      }
    }
  })
 }
}
