import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import MemershipPlanModel from 'app/models/membershipPlanModel';
import MembershipPlanDTO from 'app/models/membershipPlanDTO';
import { PageModel } from 'app/models/page-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembershipPlanService extends HttpAppDataService {

  private http: HttpClient;
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getItems(page: PageModel): Observable<ResultViewModel> {
    let membershipPlanModel = new MemershipPlanModel();
    let requestData = {
      membershipPlanDTO: membershipPlanModel,
      pageDTO: page
    };
    return this.postData(Urls.MEMBERSHIP_PLAN_LIST, requestData);
  }

  createPlan(plan: MembershipPlanDTO): Observable<any> {
    return this.postData(Urls.MEMBERSHIP_PLAN_CREATE, plan);
  }
  
  updatePlan(id: number, plan: MemershipPlanModel): Observable<any> {
    return this.postData(Urls.MEMBERSHIP_PLAN_UPDATE, plan);
  }

}
