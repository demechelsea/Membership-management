import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SoraxAnimations } from "app/common/animations/sorax-animations";
import { AppLoaderService } from "app/common/services/app-loader.service";
import { NotificationService } from "app/common/services/notification.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"],
  animations: SoraxAnimations,
})
export class AddressComponent extends BaseComponent implements OnInit {
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private loader: AppLoaderService
  ) {
    super();
  }
  ngOnInit(): void {}

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
