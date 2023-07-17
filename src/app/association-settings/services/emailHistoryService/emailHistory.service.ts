import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { PageModel } from 'app/models/page-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailHistoryService extends HttpAppDataService {

  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getEmailHistoryList(page: PageModel): Observable<ResultViewModel> {
    return this.postData(Urls.EMAIL_HISTORY_BY_ASSOC, page);
  }

}
