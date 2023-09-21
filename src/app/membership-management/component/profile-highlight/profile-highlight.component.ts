import { Component, OnInit } from "@angular/core";
import { SoraxAnimations } from "app/common/animations/sorax-animations";
import { SoraxColumnDefinition } from "app/common/components/sorax-table-view/sorax-column-definition";
import { BaseComponent } from "app/core/components/base/base.component";
import { ResultViewModel } from "app/models/result-view-model";
import { Subject } from "rxjs";


import { AssociationMemberDTO } from "app/models/AssociationMemberDTO ";
import { ActivatedRoute, Router } from "@angular/router";
import { UserProfileSettingDTO } from "app/models/UserProfileSettingDTO";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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

  public memberData: any;
  public profileForm: FormGroup;

  private ngUnsubscribe$ = new Subject<void>();

  resultViewModel: ResultViewModel = new ResultViewModel();
  listPlans: AssociationMemberDTO[];


  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    ) {
    super();
  }

  ngOnInit() {
    this.buildProfileForm(new UserProfileSettingDTO());
    this.route.params.subscribe(params => {
      this.memberData = JSON.parse(params['memberData']);      
    });
  }

  buildProfileForm(userProfile: UserProfileSettingDTO) {
    this.profileForm = this.formBuilder.group({
      id: [userProfile.id, Validators.required],
      emailNotificationFlg: [userProfile.emailNotificationFlg, Validators.required],
      mobileNotificationFlg: [userProfile.mobileNotificationFlg, Validators.required],
      contactVisibility: [userProfile.contactVisibility, Validators.required],
      photoVisibility: [userProfile.photoVisibility, Validators.required],
    });
  }

  openMembershipManagement(){
    this.router.navigate(['./membershipManagement/membershipManagement']);
  }

  
  submit(plan: UserProfileSettingDTO) {
    
  }
  
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }


  
}
