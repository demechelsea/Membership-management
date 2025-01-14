import { Component, Input, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SoraxAnimations } from "app/common/animations/sorax-animations";
import { AppLoaderService } from "app/common/services/app-loader.service";
import { NotificationService } from "app/common/services/notification.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { AssociationMemberDTO } from "app/models/AssociationMemberDTO ";
import { Subject, takeUntil } from "rxjs";
import { MycompanyService } from "app/membership-management/services/my-companies-service/my-companies.service";
import { WorkExperiencePopupComponent } from "./work-experience-popup/work-experience-popup.component";
import { WorkExperienceService } from "app/membership-management/services/work-experience-service/work-experience.service";

@Component({
  selector: "app-work-experience",
  templateUrl: "./work-experience.component.html",
  styleUrls: ["./work-experience.component.scss"],
  animations: SoraxAnimations,
})
export class WorkExperienceComponent extends BaseComponent implements OnInit {
  private ngUnsubscribe$ = new Subject<void>();

  @Input() memberData: any;
  public workExperiences: any;

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private loader: AppLoaderService,
    private workExperienceService: WorkExperienceService,
  ) {
    super();
  }
  ngOnInit(): void {
    this.getPageResults(this.memberData.userDetail.id);
  }

  getPageResults(id: number) {
    //this.loader.open();
    this.workExperienceService
      .getWorkExperience(id)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        this.workExperiences = response.result;
        this.loader.close();
      });
  }

  openPopUp(data: AssociationMemberDTO, isNew?: boolean) {
    let title = isNew ? "Add work experience" : "Update work experience";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      WorkExperiencePopupComponent,
      {
        width: "800px",
        disableClose: true,
        data: {
          title: title,
          payload: data,
          isNew: isNew,
          selectedAssociationMemberId: this.memberData.userDetail.id,
        },
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      this.getPageResults(this.memberData.userDetail.id);
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
