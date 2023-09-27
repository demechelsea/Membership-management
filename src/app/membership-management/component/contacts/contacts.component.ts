import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SoraxAnimations } from "app/common/animations/sorax-animations";
import { AppLoaderService } from "app/common/services/app-loader.service";
import { NotificationService } from "app/common/services/notification.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { UserRelationShipDTO } from "app/models/UserRelationShipDTO";
import { Subject, takeUntil } from "rxjs";
import { ContactDetailsPopupComponent } from "./contact-details-popup/contact-details-popup.component";
import { ContactService } from "app/membership-management/services/contact-service/contact.service";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.scss"],
  animations: SoraxAnimations,
})
export class ContactsComponent extends BaseComponent implements OnInit {
  private ngUnsubscribe$ = new Subject<void>();

  @Input() memberData: any;
  public contacts: any;

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private loader: AppLoaderService,
    private contactService: ContactService,

  ) {
    super();
  }
  ngOnInit(): void {
    this.getPageResults(this.memberData.userDetail.id);
  }

  getPageResults(id: number) {
    //this.loader.open();
    this.contactService
      .getContacts(id)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        this.contacts = response.result;
        this.loader.close();
      });
  }

  openPopUp(data: UserRelationShipDTO, isNew?: boolean) {
    let title = "Add contact";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      ContactDetailsPopupComponent,
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
      this.getPageResults(this.memberData.userDetail.id);
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
