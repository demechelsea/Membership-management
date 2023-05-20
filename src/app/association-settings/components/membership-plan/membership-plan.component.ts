import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MembershipPlanService } from 'app/association-settings/services/membership-plan.service';
import { soraxAnimations } from 'app/common/animations/sorax-animations';
import { SoraxColumnDefinition } from 'app/common/components/sorax-table-view/sorax-column-definition';
import { AppConfirmService } from 'app/common/services/app-confirm.service';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { NotificationService } from 'app/common/services/notification.service';
import { BaseComponent } from 'app/core/components/base/base.component';
import MemershipPlanModel from 'app/models/membership-plan-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Subject, Subscription, takeUntil } from 'rxjs';

import { MembershipPlanPopupComponent } from './membership-popup/membership-plan-popup.component';

@Component({
  selector: 'app-membership-plan',
  templateUrl: './membership-plan.component.html',
  styleUrls: ['./membership-plan.component.scss'],
  animations: soraxAnimations
})
export class MembershipPlanComponent extends BaseComponent implements OnInit {
  public membershipPlanData: any;
  public membershipColumns: SoraxColumnDefinition[];

  private ngUnsubscribe$ = new Subject<void>();

  resultViewModel: ResultViewModel = new ResultViewModel();
  listPlans: MemershipPlanModel[];

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private membershipPlanService: MembershipPlanService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
  ) {
    super();
  }

  ngOnInit() {
     this.initializeColumns();
    this.getPageResults()
  }
  ngAfterViewInit() {
   // this.dataSource.paginator = this.paginator;
   //  this.dataSource.sort = this.sort;
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  getPageResults() {
    this.loader.open();
    this.membershipPlanService.getItems(this.page)
    .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(response => {
        Object.assign(this.resultViewModel, response);
        this.listPlans =this.resultViewModel.result;
        this.membershipPlanData =  this.listPlans;
        //setting the messages 
        Object.assign(this.messages, response);
        this.loader.close();  

      });
  }

  openPopUp(data: MemershipPlanModel, isNew?:boolean) {
    let title = isNew ? 'Add Membership Plan' : 'Update Membership Plan';
    let dialogRef: MatDialogRef<any> = this.dialog.open(MembershipPlanPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data, isNew: isNew }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          // If user press cancel
          return;
        }
        
      })
  }
  deleteItem(row) {
    // this.confirmService.confirm({ message: `Delete ${row.name}?` })
    //   .subscribe(res => {
    //     if (res) {
    //       this.loader.open('Deleting Customer');
    //       this.membershipPlanService.removeItem(row)
    //         .subscribe(data => {
    //           this.dataSource = data;
    //           this.loader.close();
    //           this.notificationService.showSuccess('Customer deleted!');
    //         })
    //     }
    //   })
  }
  executeRowActions(rowData:MemershipPlanModel){
    console.log("Perform actions:::",rowData.performAction);
    if(rowData.performAction =="edit"){
      this.openPopUp(rowData, false);
    }else{
      console.log("Delete action performed");
    }
  }
  
  sortData(sortParameters: Sort) {
    this.page.currentPage =0;
    this.page.sortDirection = sortParameters.direction;
    this.page.sortColumn = sortParameters.active;
    this.getPageResults();
  }

  pageChangeEvent(event: PageEvent) {
    this.page.pageSize = event.pageSize;
    this.page.currentPage = event.pageIndex;
    this.getPageResults();
  }

  initializeColumns(): void {
    this.membershipColumns =  [
      {
        name: 'Membership Plan name',
        dataKey: 'planName',
        position: 'left',
        isSortable: true,
        link: true,
        clickEvent: (data) => {
          this.openPopUp(data, false);
        },
      },
      {
        name: 'Description',
        dataKey: 'description',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'Membership Fee',
        dataKey: 'fee',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'Status',
        dataKey: 'status',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'Active Subscriptions',
        dataKey: 'activeSubscriptions',
        dataType:'Date',
        position: 'left',
        isSortable: false,
      },
      {
        name: 'Updated On',
        dataKey: 'updatedOn',
        position: 'left',
        isSortable: true,
        dataType:"Date",
      },
      {
        name: 'Updated By',
        dataKey: 'updateBy',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'Actions',
        dataKey: 'action',
        position: 'left',
        isSortable: true,
      },
    ];
  }

}
