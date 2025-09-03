import { Component } from '@angular/core';
import { IFightData } from '../../models/IFightData';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  event?: IFightData

  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit() {
    const title = this.route.snapshot.paramMap.get('title');

    if (!title) return;

    this.dataService.displayAllData().subscribe({
      next: (res: any) => {
        this.event = res.data.find((e: IFightData) => e.title === title)
      },
      error: (err) => console.error(err)
    })
 }
}
