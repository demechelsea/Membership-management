import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import LableValueModel from 'app/models/lable-value-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';

import { Urls } from '../utils/urls';
import { HttpAppDataService } from './http-app-data.service';

@Injectable({
  providedIn: "root"
})
export class LookupService extends HttpAppDataService {
  public static MEMBERSHIP_INTERVALS: string = "membershipIntervalsLOCAL";
  public static STATUS_OPTIONS: string = "statusOptionsLOCAL";

  public static COUNTRIES: string = "countries";


  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public retrieveOptions(lookupName: string, referenceId: string): Observable<ResultViewModel> {
    if (lookupName.includes("LOCAL")) {
      return this.getLocalData(lookupName);
    }
    return this.postData(Urls.COMMON_LOOKUP_SERVICE, { name: lookupName, id: referenceId });
  }


  private getLocalData(lookupName: string): Observable<any> {
    const resultViewModelObj: ResultViewModel = new ResultViewModel();
    switch (lookupName) {
      case LookupService.MEMBERSHIP_INTERVALS:
        resultViewModelObj.result = this.getMemberShipIntervals();
        break;
      case LookupService.STATUS_OPTIONS:
        resultViewModelObj.result = this.getStatusOptions();
        break;
    }

    const optionsResultViewModel$: Observable<ResultViewModel> = new Observable<ResultViewModel>((observer) => {
      observer.next(resultViewModelObj);
      observer.complete();
    });
    
    return optionsResultViewModel$;
  }

  private getMemberShipIntervals(): LableValueModel[] {
    let intervalOptions: LableValueModel[] = [
      { id: "OneTimeID", name: "OneTime", localName: "" , postCode:"", symbol:""},
      { id: "WeeklyID", name: "Weekly", localName: ""  , postCode:"", symbol:""},
      { id: "FortnightlyID", name: "Fortnightly", localName: ""  , postCode:"", symbol:""},
      { id: "MonthlyID", name: "Monthly", localName: ""  , postCode:"", symbol:""},
      { id: "QuarterlyId", name: "Quarterly", localName: "" , postCode:"", symbol:"" },
      { id: "YearlyID", name: "Yearly", localName: "" , postCode:"", symbol:"" },
    ];
    return intervalOptions;
  }

  private getStatusOptions(): LableValueModel[] {
    let statusOptions: LableValueModel[] = [
      { id: 'active', name: 'Active', localName: '', postCode: '', symbol: '' },
      { id: 'inactive', name: 'Inactive', localName: '', postCode: '', symbol: '' },
      { id: 'closed', name: 'Closed', localName: '', postCode: '', symbol: '' }
    ];
    return statusOptions;
  }
  
}
