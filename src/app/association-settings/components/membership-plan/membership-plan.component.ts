import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MembershipPlanService } from 'app/association-settings/services/membership-plan.service';
import { AppConfirmService } from 'app/common/services/app-confirm.service';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { BaseComponent } from 'app/core/components/base/base.component';
import { soraxAnimations } from 'app/common/animations/sorax-animations';
import { Subscription } from 'rxjs';
import { MembershipPlanPopupComponent } from './membership-popup/membership-plan-popup.component';
import { NotificationService } from 'app/common/services/notification.service';
import { MemershipPlanModel } from 'app/models/membership-plan-model';
import { ResultViewModel } from 'app/models/result-view-model';

@Component({
  selector: 'app-membership-plan',
  templateUrl: './membership-plan.component.html',
  styleUrls: ['./membership-plan.component.scss'],
  animations: soraxAnimations
})
export class MembershipPlanComponent extends BaseComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: any;
  public displayedColumns: any;

  public subscription: Subscription;

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
    this.displayedColumns = this.membershipPlanService.getDisplayedColumns();
    this.getPageResults()
  }
  ngAfterViewInit() {
   // this.dataSource.paginator = this.paginator;
   //  this.dataSource.sort = this.sort;
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  getPageResults() {
    this.loader.open();
    this.subscription = this.membershipPlanService.getItems(this.page)
      .subscribe(response => {
        Object.assign(this.resultViewModel, response);
        this.listPlans =this.resultViewModel.result;
        this.dataSource =   new MatTableDataSource(this.listPlans);
        //setting the messages 
        Object.assign(this.messages, response);
        this.loader.close();  

      });
  }

  openPopUp(data: any = {}, isNew?) {
    // let title = isNew ? 'Add new Customer' : 'Update Customer';
    // let dialogRef: MatDialogRef<any> = this.dialog.open(MembershipPlanPopupComponent, {
    //   width: '720px',
    //   disableClose: true,
    //   data: { title: title, payload: data }
    // })
    // dialogRef.afterClosed()
    //   .subscribe(res => {
    //     if (!res) {
    //       // If user press cancel
    //       return;
    //     }
    //     if (isNew) {
    //       this.loader.open('Adding new Customer');
    //       this.membershipPlanService.addItem(res)
    //         .subscribe(data => {
    //           this.dataSource = data;
    //           this.loader.close();
    //           this.notificationService.showSuccess('Customer Added!');
    //         })
    //     } else {
    //       this.loader.open('Updating Customer');
    //       this.membershipPlanService.updateItem(data._id, res)
    //         .subscribe(data => {
    //           this.dataSource = data;
    //           this.loader.close();
    //           this.notificationService.showSuccess('Customer Updated!');
    //         })
    //     }
    //   })
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

}
