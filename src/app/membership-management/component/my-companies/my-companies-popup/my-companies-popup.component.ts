import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LookupService } from "app/common/services/lookup.service";
import { BaseComponent } from "app/core/components/base/base.component";
import LableValueModel from "app/models/lable-value-model";
import { Observable, Subject, takeUntil } from "rxjs";
import { AssociationMemberDTO } from "app/models/AssociationMemberDTO ";
import { NotificationService } from "app/common/services/notification.service";
import { AssociationMembersService } from "app/association-settings/services/association-members-service/association-members-service";
import moment from "moment";
import { UserCompanyDTO } from "app/models/UserCompanyDTO";
import { MycompaniesComponent } from "../my-companies.component";
import { MycompanyService } from "app/membership-management/services/my-companies-service/my-companies.service";

@Component({
  selector: "my-companies-popup",
  templateUrl: "./my-companies-popup.component.html",
  styleUrls: ["./my-companies-popup.component.scss"],
})
export class MycompaniesPopupComponent
  extends BaseComponent
  implements OnInit
{


  private ngUnsubscribe$ = new Subject<void>();
  public committeeMemberForm: FormGroup;
  public isLoading: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;
  selectedUserDetailId: number;

  selectedFile: any;
  public userCompaniesForm: FormGroup;

  buttonText = "Add a organization";
  minEndDate: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MycompaniesPopupComponent>,
    public lookupService: LookupService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private userCompaniesService: MycompanyService,
    private notificationService: NotificationService
  ) {
    super();
    this.buttonText = data.isNew
      ? "Add organization"
      : "Update organization";
      this.selectedUserDetailId = data.selectedUserDetailId;
    }

  ngOnInit() {
    this.buildAssociationMemberForm(this.data.payload);
    this.cdRef.detectChanges();
    this.handleViewAttachment();
  }

  buildAssociationMemberForm(organizationdata: UserCompanyDTO) {
    const isUpdate = !this.data.isNew;
    this.userCompaniesForm = this.formBuilder.group({
      userDetailId: [isUpdate ? this.selectedUserDetailId : null],
      companyName: [organizationdata?.companyName || ""],
      shortName: [organizationdata?.shortName || ""],
      website: [organizationdata?.website || ""],
      facebookPageUrl: [organizationdata?.facebookPageUrl || ""],
      linkedinPageUrl: [organizationdata?.linkedinPageUrl || ""],
      twitterPageUrl: [organizationdata?.twitterPageUrl || ""],
      address: [organizationdata?.address || ""],
      category: [organizationdata?.category || ""],
      // onlineAccessFlg: [
      //   this.convertToNumber(organizationdata.onlineAccessFlg) || 0,
      // ],
      logoLink: [organizationdata.logoLink || ""],
    });
  }

  handleViewAttachment() {
    if (this.imageURL != null) {
      let userCompanyModel = new UserCompanyDTO();
      userCompanyModel.logoLink = this.imageURL;
      this.userCompaniesService
        .downloadImage(userCompanyModel)
        .subscribe((response: any) => {
          const blob = new Blob([response], { type: "image/jpeg" });
          const url = window.URL.createObjectURL(blob);
          this.imageURL = url;
        });
    }
  }

  convertToNumber(str: string): number {
    return str == "Y" ? 1 : 0;
  }

  submit(userCompany: UserCompanyDTO) {
    if (this.userCompaniesForm.valid) {
      const formData = new FormData();
      formData.append("companyName", userCompany?.companyName);
      formData.append("shortName", userCompany?.shortName);
      formData.append("website", userCompany?.website);
      formData.append("facebookPageUrl", userCompany?.facebookPageUrl);
      formData.append("linkedinPageUrl", userCompany?.linkedinPageUrl);
      formData.append("twitterPageUrl", userCompany?.twitterPageUrl);
      formData.append("address", userCompany?.address);
      formData.append("category", userCompany?.category);
      //formData.append("onlineAccessFlg",userCompany?.onlineAccessFlg ? "Y" : "N");

      formData.append("photoLink", userCompany?.logoLink);
      
     
      formData.append("userDetailId", this.selectedUserDetailId.toString());

      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }

      if (this.data.isNew) {
        if (this.selectedFile) {
          formData.append("photo", this.selectedFile);
        }
        this.userCompaniesService
          .createCompanies(formData)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe((response) => {
            if (response.success) {
              this.notificationService.showSuccess(
                response.messages[0].message
              );
              this.dialogRef.close(response);
            } else {
              this.notificationService.showError(response.messages[0].message);
            }
          });
      } else {
        if (this.selectedFile) {
          formData.append("photo", this.selectedFile);
        }

        this.userCompaniesService
          .updateCompanies(formData)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe((response) => {
            if (response.success) {
              this.notificationService.showSuccess(
                response.messages[0].message
              );
              this.dialogRef.close(response);
            } else {
              this.notificationService.showError(response.messages[0].message);
            }
          });
      }
    } else {
      this.notificationService.showWarning(
        "Please fill in all the required fields."
      );
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  imageURL: string;

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => (this.imageURL = reader.result as string);

      reader.readAsDataURL(file);
    }
  }
}
