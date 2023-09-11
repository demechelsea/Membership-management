import {Component, Input, OnInit, ViewChild} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SoraxAnimations } from "app/common/animations/sorax-animations";
import { AppLoaderService } from "app/common/services/app-loader.service";
import { NotificationService } from "app/common/services/notification.service";
import { BaseComponent } from "app/core/components/base/base.component";
import { Subject, takeUntil } from "rxjs";
import EventDTO from "../../../../models/event/eventDTO";
import {Router} from "@angular/router";

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
      private loader: AppLoaderService,
      private router: Router,
  ) {
    super();
  }
  ngOnInit(): void {
    console.log(this.event);
  }

  openEvent(eventId) {
    const encodedId = encodeURIComponent(eventId);
    this.router.navigateByUrl("event-management/events/view/" + encodedId);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
