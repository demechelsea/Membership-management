import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { AssociationDTO } from 'app/models/AssociationDTO';
import { PageModel } from 'app/models/page-model';
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

  getAssocationMembers(page: PageModel): Observable<ResultViewModel> {

    let assocationMemberModel = new AssociationDTO();
    if (page != null) {
      assocationMemberModel.page = page;
    }
    return this.postData(Urls.RETRIEVE_USERS_BY_ASSOCIATION , assocationMemberModel);
  }

}
