import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFightData } from '../models/IFightData';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  displayAllData(): Observable <{data: IFightData[]; updatedAt: string}> {
    return this.httpClient.get<{data: IFightData[]; updatedAt: string}>("https://mma-fights-api-production.up.railway.app/")
  }
}
