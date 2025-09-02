import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFightData } from '../models/IFightData';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  displayAllData(): Observable <IFightData[]> {
    return this.httpClient.get<IFightData[]>("https://mma-fights-api-production.up.railway.app/")
  }
}
