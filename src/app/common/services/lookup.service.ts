import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  LableValueModel  from 'app/models/lable-value-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';

import { Urls } from '../utils/urls';
import { HttpAppDataService } from './http-app-data.service';

@Injectable({
  providedIn: "root"
})
export class LookupService extends HttpAppDataService {
  public static MEMBERSHIP_INTERVALS: string = "LOCAL_MEMBERSHIP_INTERVALS";

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public retrieveOptions(lookupName: string, searchString: string): Observable<ResultViewModel> {
    if (lookupName.includes("LOCAL")) {
      return this.getLocalData(lookupName);
    }
    return this.postData(this.getURL(lookupName), { q: searchString, lookupName: lookupName });
  }


  private getLocalData(lookupName: string): Observable<any> {
    const resultViewModelObj: ResultViewModel = new ResultViewModel();
    switch (lookupName) {
      case LookupService.MEMBERSHIP_INTERVALS:
        resultViewModelObj.result = this.getMemberShipIntervals();
        break;

    }

    const optionsResultViewModel$: Observable<ResultViewModel> = new Observable<ResultViewModel>((observer) => {
      observer.next(resultViewModelObj);
      observer.complete();
    });

    return optionsResultViewModel$;
  }

  private getURL(lookupName: string) {
    let value: string;

    switch (lookupName) {
      case LookupService.MEMBERSHIP_INTERVALS:
        value = Urls.COMMON_LOOKUP_SERVICE;
        break;

      default:
        value = Urls.COMMON_LOOKUP_SERVICE;
        break;
    }

    return value;
  }

  private getMemberShipIntervals(): LableValueModel[] {
    let intervalOptions: LableValueModel[] = [
      { id:"OneTimeID", name: "OneTime", localName:"" },
      { id:"WeeklyID", name: "Weekly", localName:"" },
      { id:"FortnightlyID", name: "Fortnightly", localName:"" },
      { id:"MonthlyID", name: "Monthly", localName:"" },
      { id:"QuarterlyId", name: "Quarterly", localName:"" },
      { id:"YearlyID", name: "Yearly", localName:"" },
    ];
    return intervalOptions;
  }
}
