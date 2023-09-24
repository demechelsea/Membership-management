import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { UserDetailDTO } from 'app/models/UserDetailDTO';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssocationMemberService extends HttpAppDataService {

  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getAssocationMembers(): Observable<ResultViewModel> {
    return this.fetchData(Urls.RETRIEVE_USERS_BY_ASSOCIATION);
  }

  subscribeToMemberDetails(userDetail: UserDetailDTO): Observable<ResultViewModel> {
    return this.postData(Urls.MEMBER_SUBSCRIBE_TO_PLAN, userDetail);
  }

}
