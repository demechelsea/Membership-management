import {Component, Input, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {SoraxAnimations} from "app/common/animations/sorax-animations";
import {AppLoaderService} from "app/common/services/app-loader.service";
import {NotificationService} from "app/common/services/notification.service";
import {BaseComponent} from "app/core/components/base/base.component";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import EventSponsorDTO from "../../../../../../models/event/eventSponsorDTO";

@Component({
  selector: "app-event-sponsor-card",
  templateUrl: "./event-sponsor-card.component.html",
  styleUrls: ["./event-sponsor-card.component.scss"],
  animations: SoraxAnimations,
})
export class EventSponsorCardComponent extends BaseComponent implements OnInit {
  private ngUnsubscribe$ = new Subject<void>();

  @Input("sponsor") eventSponsorDTO: EventSponsorDTO;

  constructor(
      private dialog: MatDialog,
      private notificationService: NotificationService,
      private loader: AppLoaderService,
      private router: Router,
  ) {
    super();
  }
  ngOnInit(): void {

  }

  openEvent(eventId) {
    this.router.navigateByUrl("event-management/events/view/" + eventId);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
