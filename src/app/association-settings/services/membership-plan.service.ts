import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import MemershipPlanModel from 'app/models/membership-plan-model';
import { PageModel } from 'app/models/page-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembershipPlanService extends HttpAppDataService {

  private apiUrl = 'http://10.1.11.143:8081';
  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getItems(page: PageModel): Observable<ResultViewModel> {
    console.log("PageInfo:::" + page)
    let membershipPlanModel = new MemershipPlanModel();
    if (page != null) {
      membershipPlanModel.page = page;
    }
    return this.postData(Urls.MEMBERSHIP_PLAN_LIST, membershipPlanModel);
  }

  getNewItems(page: PageModel): Observable<ResultViewModel> {
    console.log("PageInfo:::" + page)
    let membershipPlanModel = new MemershipPlanModel();
    if (page != null) {
      membershipPlanModel.page = page;
    }
    return this.postData(Urls.MEMBERSHIP_NEW_PLAN_LIST, membershipPlanModel);
  }

  createPlan(plan: MemershipPlanModel): Observable<MemershipPlanModel> {
    alert(plan)
    return this.http.post<MemershipPlanModel>(`${this.apiUrl}/${Urls.MEMBERSHIP_PLAN_CREATE}`, plan);
  }
  
  updatePlan(id: string, plan: MemershipPlanModel): Observable<MemershipPlanModel> {
    return this.http.put<MemershipPlanModel>(`${this.apiUrl}/${Urls.MEMBERSHIP_PLAN_UPDATE}/${id}`, plan);
  }
  deletePlan(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${Urls.MEMBERSHIP_PLAN_DELETE}/${id}`);
  }

  getDisplayedColumns() {
    return ['membershipPlanName', 'description', 'membershipFee', 'status', 'activeSubscriptions', 'updatedOn', 'updatedBy', 'actions'];
  }
}
