import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SoraxAnimations } from "app/common/animations/sorax-animations";
import { AppLoaderService } from "app/common/services/app-loader.service";
import { NotificationService } from "app/common/services/notification.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { AssociationMemberDTO } from "app/models/AssociationMemberDTO ";
import { Subject, takeUntil } from "rxjs";
import { MycompaniesPopupComponent } from "./my-companies-popup/my-companies-popup.component";

@Component({
  selector: "app-my-companies",
  templateUrl: "./my-companies.component.html",
  styleUrls: ["./my-companies.component.scss"],
  animations: SoraxAnimations,
})
export class MycompaniesComponent extends BaseComponent implements OnInit {
  private ngUnsubscribe$ = new Subject<void>();

  @Input() memberDataId: number;


  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private loader: AppLoaderService
  ) {
    super();
  }
  ngOnInit(): void {}

  openPopUp(data: AssociationMemberDTO, isNew?: boolean) {
    let title = isNew ? "Add Assocition Member" : "Update Assocition Member";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      MycompaniesPopupComponent,
      {
        width: "800px",
        disableClose: true,
        data: { title: title, payload: data, isNew: isNew, selectedUserDetailId: this.memberDataId },
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      //this.getPageResults();
    });
  }


  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
