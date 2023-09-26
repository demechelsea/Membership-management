import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SoraxAnimations } from "app/common/animations/sorax-animations";
import { AppLoaderService } from "app/common/services/app-loader.service";
import { NotificationService } from "app/common/services/notification.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { UserAddressDTO } from "app/models/UserAddressDTO";
import { Subject, takeUntil } from "rxjs";
import { AddressPopupComponent } from "./address-popup/address-popup.component";

@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"],
  animations: SoraxAnimations,
})
export class AddressComponent extends BaseComponent implements OnInit {
  private ngUnsubscribe$ = new Subject<void>();

  @Input() memberData: any;


  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private loader: AppLoaderService
  ) {
    super();
  }
  ngOnInit(): void {}

  openPopUp(data: UserAddressDTO, isNew?: boolean) {
    let title = "Add address";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      AddressPopupComponent,
      {
        width: "800px",
        disableClose: true,
        data: {
          title: title,
          payload: data,
          isNew: isNew,
          selectedUserDetail: this.memberData,
        },
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
