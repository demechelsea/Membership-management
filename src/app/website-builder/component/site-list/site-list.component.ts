import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SoraxAnimations } from 'app/common/animations/sorax-animations';
import { SoraxColumnDefinition } from 'app/common/components/sorax-table-view/sorax-column-definition';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { BaseComponent } from 'app/core/components/base/base.component';
import { ResultViewModel } from 'app/models/result-view-model';
import WebsiteInfoModel from 'app/models/website-info-model';
import { WebsiteService } from 'app/website-builder/services/website.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'sorax-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss'],
  animations: SoraxAnimations,
})
export class SiteListComponent extends BaseComponent implements OnInit {
  dialogRef: MatDialogRef<any>;

  public websiteDetailsData: any;
  public siteListColumns: SoraxColumnDefinition[];


  private ngUnsubscribe$ = new Subject<void>();

  resultViewModel: ResultViewModel = new ResultViewModel();
  siteList: WebsiteInfoModel[];

  constructor(
    private router:Router,
    private loader: AppLoaderService,
    private websiteService: WebsiteService,
    public dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    this.initializeColumns();
    this.getPageResults();
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getPageResults() {
    this.loader.open();
    this.websiteService
      .retrieveWebsites()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        Object.assign(this.resultViewModel, response);
        this.siteList = this.resultViewModel.result;
        this.websiteDetailsData = this.siteList;
        Object.assign(this.messages, response);
        this.loader.close();
      });
  }


  openPopUp(data: WebsiteInfoModel, isNew?: boolean) {
    let title = isNew ? "Add Membership Plan" : "Update Membership Plan";
    // let dialogRef: MatDialogRef<any> = this.dialog.open(
    //   MembershipPlanPopupComponent,
    //   {
    //     width: "720px",
    //     disableClose: true,
    //     data: { title: title, payload: data, isNew: isNew },
    //   }
    // );
    // dialogRef.afterClosed().subscribe((res) => {
    //   if (!res) {
    //     return;
    //   }
    //   this.getPageResults();
    // });
  }

  openDialog(templateRef: TemplateRef<any>) {
    this.dialogRef = this.dialog.open(templateRef, { disableClose: true });
  }


  executeRowActions(rowData: WebsiteInfoModel) {
    if (rowData.performAction == "edit") {
      //TODO: Load html contnet and navigate to WebsiteBuilder
    } else {
      console.log("Delete action performed");
    }
  }

  selectTheme(themeName:string){
    this.dialogRef.close();
    this.router.navigate(['/builder/websiteBuilder'], { state: { selectedTheme: themeName } });
  }

  loadTheme(websiteInfoId:string){
    this.dialogRef.close();
    this.router.navigate(['/builder/websiteBuilder'], { state: { referenceId: websiteInfoId } });
  }

  initializeColumns(): void {
    this.siteListColumns = [
      {
        name: "Theme name",
        dataKey: "themeName",
        position: "left",
        isSortable: true,
        link: false
      },
      {
        name: "Status",
        dataKey: "status",
        position: "left",
        isSortable: true,
      },
      {
        name: "Updated On",
        dataKey: "modifiedTimestamp",
        position: "left",
        isSortable: true,
        dataType: "Date",
      },
      {
        name: "Updated By",
        dataKey: "modifiedUser",
        position: "left",
        isSortable: true,
      },
    ];
  }

}
