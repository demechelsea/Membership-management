import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
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
    this.eventService.getEventById(id)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((response) => {
          Object.assign(this.resultViewModel, response);
          console.log(this.resultViewModel);
          this.event = this.resultViewModel.result;
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

}
