import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SoraxAnimations } from 'app/common/animations/sorax-animations';
import { SoraxColumnDefinition } from 'app/common/components/sorax-table-view/sorax-column-definition';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { NotificationService } from 'app/common/services/notification.service';
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
    private router: Router,
    private loader: AppLoaderService,
    private websiteService: WebsiteService,
    public dialog: MatDialog,
    private notificationService: NotificationService

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
        this.loader.close();
      });
  }

  openDialog(templateRef: TemplateRef<any>) {
    this.dialogRef = this.dialog.open(templateRef, { disableClose: true });
  }

  executeRowActions(rowData: WebsiteInfoModel) {
    if (rowData.performAction == "View") {
      this.loadTheme(rowData.encryptedId);
    } else if(rowData.performAction == "Delete") {
      this.deleteWebSiteInfo(rowData.encryptedId);
    }
  }

  selectTheme(themeName: string) {
    this.dialogRef.close();
    this.router.navigate(['/builder/websiteBuilder'], { state: { selectedTheme: themeName } });
  }

  loadTheme(websiteInfoId: string) {
    this.router.navigate(['/builder/websiteBuilder'], { state: { referenceId: websiteInfoId } });
  }

  deleteWebSiteInfo(websiteInfoEncryptId: string) {
    this.loader.open();
    let websiteInfo = new WebsiteInfoModel();
    websiteInfo.encryptedId = websiteInfoEncryptId;
    websiteInfo.status ='Deleted';
    this.websiteService
      .updateStatus(websiteInfo).pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        this.loader.close();
        Object.assign(this.resultViewModel, response);
        websiteInfo = this.resultViewModel.result;
        Object.assign(this.messages, response);
        this.notificationService.showMessages(this.messages);
        this.getPageResults();
      });
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
      {
        name: "Action",
        dataKey: "action",
        position: "left",
        isSortable: false,
      },
    ];
  }

}
