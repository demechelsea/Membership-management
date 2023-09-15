import { Component, OnInit } from "@angular/core";
import { SoraxAnimations } from "app/common/animations/sorax-animations";
import { SoraxColumnDefinition } from "app/common/components/sorax-table-view/sorax-column-definition";
import { AppLoaderService } from "app/common/services/app-loader.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { ResultViewModel } from "app/models/result-view-model";
import { Subject } from "rxjs";


import { AssociationMemberDTO } from "app/models/AssociationMemberDTO ";
import { AssociationMembersService } from "app/association-settings/services/association-members-service/association-members-service";

@Component({
  selector: "app-membership-plan",
  templateUrl: "./profile-highlight.component.html",
  styleUrls: ["./profile-highlight.component.scss"],
  animations: SoraxAnimations,
})
export class ProfileHighlightComponent
  extends BaseComponent
  implements OnInit
{
  public associationMemberData: any;
  public membershipColumns: SoraxColumnDefinition[];

  private ngUnsubscribe$ = new Subject<void>();

  resultViewModel: ResultViewModel = new ResultViewModel();
  listPlans: AssociationMemberDTO[];


  constructor(
    
  ) {
    super();
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }


  
}
