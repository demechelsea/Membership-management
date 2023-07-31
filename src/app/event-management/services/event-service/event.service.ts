import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import committeeDTO from 'app/models/committeeDTO';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';
import EventDTO from "../../../models/eventDTO";

@Injectable({
  providedIn: 'root'
})
export class EventService extends HttpAppDataService {

  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getActiveEvents(): Observable<ResultViewModel> {
    return this.fetchData(Urls.ACTIVE_EVENT_LIST);
  }

  addEvent(eventDto: EventDTO): Observable<any> {
    return this.postData(Urls.EVENTS, eventDto);
  }

  // createCommittee(plan: committeeDTO): Observable<any> {
  //   return this.postData(Urls.COMMITTEE_CREATE, plan);
  // }
  //
  // updateCommittee(id: number, plan: committeeDTO): Observable<any> {
  //   return this.postData(Urls.COMMITTEE_UPDATE, plan);
  // }

}
