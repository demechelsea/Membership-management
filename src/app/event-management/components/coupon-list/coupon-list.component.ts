import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SoraxAnimations} from 'app/common/animations/sorax-animations';
import {SoraxColumnDefinition} from 'app/common/components/sorax-table-view/sorax-column-definition';
import {BaseComponent} from 'app/core/components/base/base.component';
import {ResultViewModel} from 'app/models/result-view-model';
import {Subject, takeUntil} from 'rxjs';
import CouponDTO from "../../../models/CouponDTO";
import {CouponService} from "../../services/event-service/coupon.service";
import {CouponPopupComponent} from "../coupon-popup/coupon-popup.component";

@Component({
  selector: 'sorax-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss'],
  animations: SoraxAnimations,
})
export class CouponListComponent extends BaseComponent implements OnInit {

    private ngUnsubscribe$ = new Subject<void>();
    resultViewModel: ResultViewModel = new ResultViewModel();
    couponsList: CouponDTO[]

    public couponColumns: SoraxColumnDefinition[];

    constructor(
        private dialog: MatDialog,
        private couponService: CouponService
    ) {
        super();
    }

    ngOnInit(): void {
        this.initializeColumns();
        this.getCoupons();
    }

    getCoupons() {
        this.couponService.getCoupons()
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe((response) => {
                Object.assign(this.resultViewModel, response);
                this.couponsList = this.resultViewModel.result;
            })
    }

    openPopUp(data: CouponDTO, isNew?: boolean) {
        let title = isNew ? "Add Coupon" : "Edit Coupon";
        let dialogRef: MatDialogRef<any> = this.dialog.open(
            CouponPopupComponent,
            {
                width: "720px",
                disableClose: true,
                data: {title: title, payload: data, isNew: isNew},
            }
        );
        dialogRef.afterClosed().subscribe((res) => {
            if (!res) {
                return;
            }
        });
    }

    executeRowActions(rowData: CouponDTO) {
        if (rowData.performAction == "Edit") {
            this.openPopUp(rowData, false);
        }
    }

    initializeColumns(): void {
        this.couponColumns = [
            {
                name: "Coupon Code",
                dataKey: "code",
                position: "left",
                isSortable: true,

            },
            {
                name: "Coupon Name",
                dataKey: "name",
                position: "left",
                isSortable: true,
                link: true,
                clickEvent: (data) => {
                    this.openPopUp(data, false);
                }
            },
            {
                name: "Discount",
                dataKey: "discountLabel",
                position: "left",
                isSortable: true,
            },
            {
                name: "End Date",
                dataKey: "expiryDate",
                position: "left",
                isSortable: true
            },
            {
                name: "Max Redemptions",
                dataKey: "maxRedemption",
                position: "left",
                isSortable: true,
            },
            {
                name: "Status",
                dataKey: "status",
                position: "left",
                isSortable: false,
            },
            {
                name: "Action",
                dataKey: "action",
                position: "left",
                isSortable: false,
            },
        ];
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
