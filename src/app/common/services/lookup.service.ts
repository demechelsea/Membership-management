import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LableValueModel } from 'app/models/lable-value-model';
import { MessageViewModel } from 'app/models/message-view-model';
import { MessageWrapModel } from 'app/models/message-wrap-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';
import { Urls } from '../utils/urls';

import { HttpAppDataService } from './http-app-data.service';

@Injectable({
  providedIn: "root"
})
export class LookupService extends HttpAppDataService {
 
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public retrieveIntervals(searchString: string): Observable<ResultViewModel> {
    console.log("post string", searchString)
    return this.postData(Urls.COMMON_LOOKUP_SERVICE, {q:searchString});
  }

}
