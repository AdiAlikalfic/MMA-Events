import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOddsData } from '../models/IOddsData';

@Injectable({
  providedIn: 'root'
})
export class OddsService {

  constructor(private httpClient: HttpClient) { }

  displayOddsData(): Observable <IOddsData[]> {
    return this.httpClient.get<IOddsData[]>("https://api.the-odds-api.com/v4/sports/mma_mixed_martial_arts/odds?regions=us&markets=h2h&oddsFormat=american&apiKey=b173af75516673588c344fd34bc9ccf5")
  }
}
