import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {SoraxAnimations} from 'app/common/animations/sorax-animations';
import {SoraxColumnDefinition} from 'app/common/components/sorax-table-view/sorax-column-definition';
import {AppLoaderService} from 'app/common/services/app-loader.service';
import {NotificationService} from 'app/common/services/notification.service';
import {BaseComponent} from 'app/core/components/base/base.component';
import {ResultViewModel} from 'app/models/result-view-model';
import {Subject, takeUntil} from 'rxjs';
import {MatTabChangeEvent, MatTabGroup} from "@angular/material/tabs";
import {ThemePalette} from "@angular/material/core";
import {CommitteePositionDTO} from "../../../models/committeePositionDTO";
import {AppConfirmService} from "../../../common/services/app-confirm.service";
import {PositionService} from "../../../association-settings/services/position-service/position.service";
import {
  openEventManagementPopupService
} from "../../services/openEventManagementPopup-service/openEventManagementPopup.service";
import {EventService} from "../../services/event-service/event.service";
import EventDTO from "../../../models/event/eventDTO";
import {Urls} from "../../../common/utils/urls";
import * as moment from "moment/moment";
import {EventPopupComponent} from "../event-popup/event-popup.component";

@Component({
  selector: 'sorax-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss'],
  animations: SoraxAnimations,
})
export class EventViewComponent extends BaseComponent implements OnInit {

  returnToCommitteeMemberPopup = false;
  @Output() openCommitteeMemberPopup: EventEmitter<void> =
      new EventEmitter<void>();

  @ViewChild("tabGroup") tabGroup: MatTabGroup;

  links = ["Active Events", "Past Events", "Coupons"];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  public committeePlanData: any;
  public committeeColumns: SoraxColumnDefinition[];

  private ngUnsubscribe$ = new Subject<void>();

  resultViewModel: ResultViewModel = new ResultViewModel();
  eventList: EventDTO[];
  event: EventDTO;
  positions: CommitteePositionDTO[];

  showDetails: boolean = false;
  selectedRow: any;
  showCommitteeTable: boolean = true;
  rowAction: EventEmitter<any> = new EventEmitter<any>();

  toggleBackground() {
    this.background = this.background ? undefined : "primary";
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }
  constructor(
      private dialog: MatDialog,
      private notificationService: NotificationService,
      private eventService: EventService,
      private loader: AppLoaderService,
      private confirmService: AppConfirmService,
      private positionService: PositionService,
      private openEventManagementPopupService: openEventManagementPopupService,
      private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.getEventById(id);
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  getEventById(id){
    this.loader.open();
    this.eventService.getEventById(encodeURIComponent(id))
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((response) => {
          Object.assign(this.resultViewModel, response);
          console.log(this.resultViewModel);
          this.event = this.resultViewModel.result;
          if (this.event.eventImageLink){
              this.event.imageUrl = Urls.baseAPIUrl + "/" + this.event.eventImageLink;
          }
          this.event.startTimeLabel = moment(this.event.startDate).format("MMMM Do YYYY, h:mm:ss a");
          this.event.endTimeLabel = moment(this.event.endDate).format("MMMM Do YYYY, h:mm:ss a");
          console.log(this.event);
          this.loader.close();
        })

  }

  onTabChange(event: MatTabChangeEvent) {
    if (event.index === 1) {
      this.positionService
          .getCommitteePositions()
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe((response) => {
            this.positions = response.result;
            this.positions.sort((a, b) => a.positionRank - b.positionRank);
          });
    }
  }

    openEventPopUp(data: EventDTO, isNew?: boolean) {
        let title = isNew ? "New Event" : "Edit Event";
        let dialogRef: MatDialogRef<any> = this.dialog.open(
            EventPopupComponent,
            {
                width: "720px",
                disableClose: true,
                data: { title: title, payload: data, isNew: isNew },
            }
        );

        dialogRef.afterClosed().subscribe((res) => {
            if (!res) {
                console.log("no res", res);
                return;
            }

            if (!isNew) {
                console.log("editing res", res);
                data.name = res.name;
            } else {
                console.log("creating res", res);
                this.eventList.push(res);
            }
        });

    }

}
