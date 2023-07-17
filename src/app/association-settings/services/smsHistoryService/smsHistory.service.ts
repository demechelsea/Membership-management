import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { AssociationDTO } from 'app/models/AssociationDTO';
import { EmailSubscriptionDTO } from 'app/models/emailSubscriptionDTO';
import { PageModel } from 'app/models/page-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmsHistoryService extends HttpAppDataService {

  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getSmsHistoryList(page: PageModel): Observable<ResultViewModel> {
    return this.postData(Urls.MSG_HISTORY_BY_ASSOC, page);
  }

}
