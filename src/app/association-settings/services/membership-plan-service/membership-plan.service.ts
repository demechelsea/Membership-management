import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { AssociationModel } from 'app/models/association-model';
import MemershipPlanModel from 'app/models/membershipPlanModel';
import MembershipPlanDTO from 'app/models/membershipPlanDTO';
import { PageModel } from 'app/models/page-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
    if (page != null) {
      membershipPlanModel.page = page;
    }
    return this.postData(Urls.MEMBERSHIP_PLAN_LIST, membershipPlanModel);
  }

  getNewItems(page: PageModel): Observable<ResultViewModel> {
    let membershipPlanModel = new MemershipPlanModel();
    if (page != null) {
      membershipPlanModel.page = page;
    }
    return this.postData(Urls.MEMBERSHIP_NEW_PLAN_LIST, membershipPlanModel);
  }

  createPlan(plan: MembershipPlanDTO): Observable<MemershipPlanModel> {
    return this.postData(Urls.MEMBERSHIP_PLAN_CREATE, plan);
  }
  
  updatePlan(id: number, plan: MemershipPlanModel): Observable<MemershipPlanModel> {
    return this.postData(Urls.MEMBERSHIP_PLAN_UPDATE, plan);
  }

}
