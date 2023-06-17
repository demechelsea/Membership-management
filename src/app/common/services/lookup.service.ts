import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import LableValueModel from 'app/models/lable-value-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';

import { Urls } from '../utils/urls';
import { HttpAppDataService } from './http-app-data.service';
import { CommitteePositionDTO } from 'app/models/committeePositionDTO';
import { PositionService } from 'app/association-settings/services/position-service/position.service';
import { AssocationMemberService } from 'app/association-settings/services/assocation-member-service/assocation-member.service';
import { AssociationDTO } from 'app/models/AssociationDTO';

@Injectable({
  providedIn: "root"
})
export class LookupService extends HttpAppDataService {
  public static MEMBERSHIP_INTERVALS: string = "membershipIntervalsLOCAL";
  public static STATUS_OPTIONS: string = "statusOptionsLOCAL";
  public static POSITION_OPTIONS: string = "positionOptions";
  public static MEMBER_OPTIONS: string = "memberOptions"
  public static COUNTRIES: string = "countries";
  committeePositions: CommitteePositionDTO[] = [];
  assocationMembers: AssociationDTO[] = [];
  private ngUnsubscribe$ = new Subject<void>();

  constructor(httpClient: HttpClient, private positionService: PositionService, private assocationMemberService: AssocationMemberService) {
    super(httpClient);
  }

  public retrieveOptions(lookupName: string, referenceId: string, id: number): Observable<ResultViewModel> {
    if (lookupName.includes("LOCAL")) {
      return this.getLocalData(lookupName);
    } else if (lookupName.includes("position")) {
      return this.positionService.getCommitteePositions(null, id)
        .pipe(takeUntil(this.ngUnsubscribe$),
          map((response: ResultViewModel) => {
            return response;
          })
        );
    } else if (lookupName.includes("member")) {
      return this.assocationMemberService.getAssocationMembers(null)
        .pipe(takeUntil(this.ngUnsubscribe$),
          map((response: ResultViewModel) => {
            return response;
          })
        );
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
      { id: "OneTimeID", name: "OneTime", localName: "", postCode: "", symbol: "" },
      { id: "WeeklyID", name: "Weekly", localName: "", postCode: "", symbol: "" },
      { id: "FortnightlyID", name: "Fortnightly", localName: "", postCode: "", symbol: "" },
      { id: "MonthlyID", name: "Monthly", localName: "", postCode: "", symbol: "" },
      { id: "QuarterlyId", name: "Quarterly", localName: "", postCode: "", symbol: "" },
      { id: "YearlyID", name: "Yearly", localName: "", postCode: "", symbol: "" },
    ];
    return intervalOptions;
  }

  private getStatusOptions(): LableValueModel[] {
    let statusOptions: LableValueModel[] = [
      { id: 'activeID', name: 'Active', localName: '', postCode: '', symbol: '' },
      { id: 'inactiveID', name: 'Inactive', localName: '', postCode: '', symbol: '' },
      { id: 'closedID', name: 'Closed', localName: '', postCode: '', symbol: '' }
    ];
    return statusOptions;
  }

}
