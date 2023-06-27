import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import committeeDTO from 'app/models/committeeDTO';
import { PageModel } from 'app/models/page-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommitteeService extends HttpAppDataService {

  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getItems(page: PageModel): Observable<ResultViewModel> {

    let committeeModel = new committeeDTO();
    if (page != null) {
      committeeModel.page = page;
    }
    return this.postData(Urls.COMMITTEE_LIST, committeeModel);
  }


  createCommittee(plan: committeeDTO): Observable<committeeDTO> {
    return this.postData(Urls.COMMITTEE_CREATE, plan);
  }
  
  updateCommittee(id: number, plan: committeeDTO): Observable<committeeDTO> {
    return this.postData(Urls.COMMITTEE_UPDATE, plan);
  }

}
