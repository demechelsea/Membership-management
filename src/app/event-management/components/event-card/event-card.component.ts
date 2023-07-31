import {Component, Input, OnInit, ViewChild} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SoraxAnimations } from "app/common/animations/sorax-animations";
import { AppLoaderService } from "app/common/services/app-loader.service";
import { NotificationService } from "app/common/services/notification.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { Subject, takeUntil } from "rxjs";
import EventDTO from "../../../models/eventDTO";

@Component({
  selector: "app-event-card",
  templateUrl: "./event-card.component.html",
  styleUrls: ["./event-card.component.scss"],
  animations: SoraxAnimations,
})
export class EventCardComponent extends BaseComponent implements OnInit {
  private ngUnsubscribe$ = new Subject<void>();

  @Input("event") event: EventDTO;

  constructor(
      private dialog: MatDialog,
      private notificationService: NotificationService,
      private loader: AppLoaderService
  ) {
    super();
  }
  ngOnInit(): void {
    console.log(this.event);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
