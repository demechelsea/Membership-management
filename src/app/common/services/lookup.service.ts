import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import LableValueModel from "app/models/lable-value-model";
import { ResultViewModel } from "app/models/result-view-model";
import { Observable, Subject, map, takeUntil } from "rxjs";

import { Urls } from "../utils/urls";
import { HttpAppDataService } from "./http-app-data.service";
import { CommitteePositionDTO } from "app/models/committeePositionDTO";
import { PositionService } from "app/association-settings/services/position-service/position.service";
import { AssocationMemberService } from "app/association-settings/services/assocation-member-service/assocation-member.service";
import { AssociationDTO } from "app/models/AssociationDTO";
import MembershipPlanDTO from "app/models/membershipPlanDTO";
import { MembershipPlanService } from "app/association-settings/services/membership-plan-service/membership-plan.service";

@Injectable({
  providedIn: "root",
})
export class LookupService extends HttpAppDataService {
  public static MEMBERSHIP_INTERVALS: string = "membershipIntervalsLOCAL";
  public static STATUS_OPTIONS: string = "statusOptionsLOCAL";
  public static POSITION_OPTIONS: string = "positionOptions";
  public static MEMBER_OPTIONS: string = "memberOptions";
  public static MEMBERSHIP_PLAN_OPTIONS: string = "membershipPlanOptions";
  public static GENDER_OPTIONS: string = "genderOptionsLOCAL";
  public static MARITAL_STATUS_OPTIONS: string = "maritalStatusOptionsLOCAL";
  public static HIGHER_EDUCATION_OPTIONS: string = "higherEducationOptionsLOCAL";
  public static TITLE_OPTIONS: string = "titleOptionsLOCAL";

  public static COUNTRIES: string = "countries";
  public static TIMEZONES: string = "timezones";
  committeePositions: CommitteePositionDTO[] = [];
  assocationMembers: AssociationDTO[] = [];
  membershipPlan: MembershipPlanDTO[] = [];
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    httpClient: HttpClient,
    private positionService: PositionService,
    private assocationMemberService: AssocationMemberService,
    private memebershipPlanService: MembershipPlanService
  ) {
    super(httpClient);
  }

  public retrieveOptions(
    lookupName: string,
    referenceId: string
  ): Observable<ResultViewModel> {
    if (lookupName.includes("LOCAL")) {
      return this.getLocalData(lookupName);
    }
    else if (lookupName.includes("position")) {
      return this.positionService.getCommitteePositions().pipe(
        takeUntil(this.ngUnsubscribe$),
        map((response: ResultViewModel) => {
          return response;
        })
      );
    }
    else if (lookupName.includes("memberOptions")) {
      return this.assocationMemberService.getAssocationMembers(null).pipe(
        takeUntil(this.ngUnsubscribe$),
        map((response: ResultViewModel) => {
          return response;
        })
      );
    }
    else if (lookupName.includes("membershipPlanOptions")) {
      return this.memebershipPlanService.getItems(null).pipe(
        takeUntil(this.ngUnsubscribe$),
        map((response: ResultViewModel) => {
          return response;
        })
      );
    }
    return this.postData(Urls.COMMON_LOOKUP_SERVICE, {
      name: lookupName,
      id: referenceId,
    });
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
      case LookupService.GENDER_OPTIONS:
        resultViewModelObj.result = this.getGenderOptions();
        break;
      case LookupService.MARITAL_STATUS_OPTIONS:
        resultViewModelObj.result = this.getMaritalStatusOptions();
        break;
      case LookupService.HIGHER_EDUCATION_OPTIONS:
        resultViewModelObj.result = this.getHigherEducationOptions();
        break;
      case LookupService.TITLE_OPTIONS:
        resultViewModelObj.result = this.getTitleOptions();
        break;
    }

    const optionsResultViewModel$: Observable<ResultViewModel> =
      new Observable<ResultViewModel>((observer) => {
        observer.next(resultViewModelObj);
        observer.complete();
      });

    return optionsResultViewModel$;
  }

  private getMemberShipIntervals(): LableValueModel[] {
    let intervalOptions: LableValueModel[] = [
      {
        id: "OneTimeID",
        name: "OneTime",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "WeeklyID",
        name: "Weekly",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "FortnightlyID",
        name: "Fortnightly",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "MonthlyID",
        name: "Monthly",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "QuarterlyId",
        name: "Quarterly",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "YearlyID",
        name: "Yearly",
        localName: "",
        postCode: "",
        symbol: "",
      },
    ];
    return intervalOptions;
  }

  private getStatusOptions(): LableValueModel[] {
    let statusOptions: LableValueModel[] = [
      {
        id: "activeID",
        name: "Active",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "inactiveID",
        name: "Inactive",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "closedID",
        name: "Closed",
        localName: "",
        postCode: "",
        symbol: "",
      },
    ];
    return statusOptions;
  }

  private getGenderOptions(): LableValueModel[] {
    let statusOptions: LableValueModel[] = [
      {
        id: "maleID",
        name: "Male",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "femaleID",
        name: "Female",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "otherID",
        name: "Other",
        localName: "",
        postCode: "",
        symbol: "",
      },
    ];
    return statusOptions;
  }

  private getMaritalStatusOptions(): LableValueModel[] {
    let statusOptions: LableValueModel[] = [
      {
        id: "singleID",
        name: "Single",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "marriedID",
        name: "Married",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "widowedOrWidowerID",
        name: "Closed",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "divorcedID",
        name: "Divorced",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "separatedID",
        name: "Closed",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "otherID",
        name: "Other",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "preferNotToSayID",
        name: "Prefer not to say",
        localName: "",
        postCode: "",
        symbol: "",
      },
    ];
    return statusOptions;
  }

  private getHigherEducationOptions(): LableValueModel[] {
    let statusOptions: LableValueModel[] = [
      {
        id: "noFormalEducationID",
        name: "No formal education",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "primaryEducationID",
        name: "Primary education",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "secondaryEducationID",
        name: "Secondary education or high school",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "associateDegreeID",
        name: "Associate's degree",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "bachelorDegreeID",
        name: "Bachelor's degree",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "masterDegreeID",
        name: "Master's degree",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "doctorateOrHigherID",
        name: "Doctorate or higher",
        localName: "",
        postCode: "",
        symbol: "",
      }
    ];
    return statusOptions;
  }

  private getTitleOptions(): LableValueModel[] {
    let titleOptions: LableValueModel[] = [
      {
        id: "mrID",
        name: "Mr.",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "mrsID",
        name: "Mrs.",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "msID",
        name: "Ms.",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "missID",
        name: "Miss",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "mxID",
        name: "Mx.",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "drID",
        name: "Dr.",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "profID",
        name: "Prof.",
        localName: "",
        postCode: "",
        symbol: "",
      }
    ];
    return titleOptions;
  }


}
