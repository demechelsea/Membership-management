import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import LableValueModel from "app/models/lable-value-model";
import { ResultViewModel } from "app/models/result-view-model";
import { Observable, Subject, map, takeUntil } from "rxjs";

import { Urls } from "../utils/urls";
import { HttpAppDataService } from "./http-app-data.service";
import { CommitteePositionDTO } from "app/models/committeePositionDTO";
import { PositionService } from "app/association-settings/services/position-service/position.service";
import { AssociationDTO } from "app/models/AssociationDTO";
import MembershipPlanDTO from "app/models/membershipPlanDTO";
import { MembershipPlanService } from "app/association-settings/services/membership-plan-service/membership-plan.service";
import { AssociationMembersService } from "app/association-settings/services/association-members-service/association-members-service";
import { PageModel } from "app/models/page-model";

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
  public static DATE_FORMATS: string = "dateFormatOptionsLOCAL";

  public static COUNTRIES: string = "countries";
  public static CURRENCIES: string = "currencies";
  public static LANGUAGES: string = "languages";
  public static TIMEZONES: string = "timezones";
  
  committeePositions: CommitteePositionDTO[] = [];
  assocationMembers: AssociationDTO[] = [];
  membershipPlan: MembershipPlanDTO[] = [];
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    httpClient: HttpClient,
    private positionService: PositionService,
    private associationMemberService: AssociationMembersService,
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
      let page = new PageModel()
      return this.associationMemberService.getAssociationMembers(page).pipe(
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
     case LookupService.DATE_FORMATS:
        resultViewModelObj.result = this.getDateFormats();
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
        code:"",
        name: "OneTime",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "WeeklyID",
        code:"",
        name: "Weekly",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "FortnightlyID",
        code:"",
        name: "Fortnightly",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "MonthlyID",
        code:"",
        name: "Monthly",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "QuarterlyId",
        code:"",
        name: "Quarterly",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "YearlyID",
        code:"",
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
        code:"",
        name: "Active",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "inactiveID",
        code:"",
        name: "Inactive",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "closedID",
        code:"",
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
        code:"",
        name: "Male",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "femaleID",
        code:"",
        name: "Female",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "otherID",
        code:"",
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
        code:"",
        name: "Single",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "marriedID",
        code:"",
        name: "Married",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "widowedOrWidowerID",
        code:"",
        name: "Closed",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "divorcedID",
        code:"",
        name: "Divorced",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "separatedID",
        code:"",
        name: "Closed",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "otherID",
        code:"",
        name: "Other",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "preferNotToSayID",
        code:"",
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
        code:"",
        name: "No formal education",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "primaryEducationID",
        code:"",
        name: "Primary education",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "secondaryEducationID",
        code:"",
        name: "Secondary education or high school",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "associateDegreeID",
        code:"",
        name: "Associate's degree",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "bachelorDegreeID",
        code:"",
        name: "Bachelor's degree",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "masterDegreeID",
        code:"",
        name: "Master's degree",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "doctorateOrHigherID",
        code:"",
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
        code:"",
        name: "Mr.",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "mrsID",
        code:"",
        name: "Mrs.",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "msID",
        code:"",
        name: "Ms.",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "missID",
        code:"",
        name: "Miss",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "mxID",
        code:"",
        name: "Mx.",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "drID",
        code:"",
        name: "Dr.",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "profID",
        code:"",
        name: "Prof.",
        localName: "",
        postCode: "",
        symbol: "",
      }
    ];
    return titleOptions;
  }

  private getDateFormats(): LableValueModel[] {
    let dateFormats: LableValueModel[] = [
      {
        id: "dd/MM/yyyy",
        code:"",
        name: "dd/MM/yyyy",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "MM/dd/yyyy",
        code:"",
        name: "MM/dd/yyyy",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "dd-MM-yyyy",
        code:"",
        name: "dd-MM-yyyy",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "MM-dd-yyyy",
        code:"",
        name: "MM-dd-yyyy",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "dd-MM-yyyy hh:mm:ss",
        code:"",
        name: "dd-MM-yyyy hh:mm:ss",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "dd MMMM yyyy",
        code:"",
        name: "dd MMMM yyyy",
        localName: "",
        postCode: "",
        symbol: "",
      },
      {
        id: "E, dd MMM yyyy HH:mm:ss z",
        code:"",
        name: "E, dd MMM yyyy HH:mm:ss z",
        localName: "",
        postCode: "",
        symbol: "",
      }
    ];
    return dateFormats;
  }


}
