import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { MemershipPlanModel } from 'app/models/membership-plan-model';
import { PageModel } from 'app/models/page-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembershipPlanService extends HttpAppDataService {

  items: any[];
  constructor(httpClient: HttpClient) {
    super(httpClient);
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

  addItem(item): Observable<any> {
    // item._id = Math.round(Math.random() * 10000000000).toString();
    // this.items.unshift(item);
    // return of(this.items.slice()).pipe(delay(1000));
    return null;
  }
  updateItem(id, item) {
    // this.items = this.items.map(i => {
    //   if(i._id === id) {
    //     return Object.assign({}, i, item);
    //   }
    //   return i;
    // })
    // return of(this.items.slice()).pipe(delay(1000));
  }
  removeItem(row) {
    // let i = this.items.indexOf(row);
    // this.items.splice(i, 1);
    // return of(this.items.slice()).pipe(delay(1000));
  }

  getDisplayedColumns() {
    return ['membershipPlanName', 'description', 'membershipFee', 'status', 'activeSubscriptions', 'updatedOn', 'updatedBy', 'actions'];
  }
}
