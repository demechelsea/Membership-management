import {ChangeDetectorRef, Component, Inject, OnInit} from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LookupService} from "app/common/services/lookup.service";
import {BaseComponent} from "app/core/components/base/base.component";
import LableValueModel from "app/models/lable-value-model";
import {Observable, Subject, takeUntil} from "rxjs";
import {LocalstorageService} from "app/common/services/localstorage.service";
import {NotificationService} from "app/common/services/notification.service";
import CouponDTO from "../../../models/CouponDTO";
import {CouponService} from "../../services/event-service/coupon.service";

@Component({
    selector: "app-coupon-popup",
    templateUrl: "./coupon-popup.component.html",
})
export class CouponPopupComponent extends BaseComponent implements OnInit {
    intervaloptionsKey: string = LookupService.MEMBERSHIP_INTERVALS;
    statusoptionsKey: string = LookupService.STATUS_OPTIONS;

    private ngUnsubscribe$ = new Subject<void>();
    public membershipPlanForm: FormGroup;
    public couponForm: FormGroup;
    public intervals: LableValueModel[] = [];
    public isLoading: boolean;
    public noResults: boolean;
    filteredIntervals$: Observable<LableValueModel[]>;
    availableStatus = [{
        name: "Active",
        value: "ACTIVE"
    }, {
        name: "Closed",
        value: "CLOSED"
    }, {
        name: "Delete",
        value: "DELETE"
    }]

    discountTypes = [{
        name: "Fixed Amount",
        value: "AMOUNT"
    }, {
        name: "Percentage",
        value: "PERCENTAGE"
    }]

    buttonText = "Add Coupon";

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<CouponPopupComponent>,
        public lookupService: LookupService,
        private formBuilder: FormBuilder,
        private cdRef: ChangeDetectorRef,
        private couponService: CouponService,
        private localStorageService: LocalstorageService,
        private notificationService: NotificationService
    ) {
        super();
        this.buttonText = data.isNew ? "Add a coupon" : "Edit coupon";
    }

    ngOnInit() {
        this.buildCouponForm(this.data.payload);
        this.cdRef.detectChanges();
    }

    buildCouponForm(couponDTO: CouponDTO) {
        const isUpdate = !this.data.isNew;
        this.couponForm = this.formBuilder.group({
            id: [isUpdate ? couponDTO.id : null, isUpdate ? Validators.required : []],
            name: [couponDTO.name || "", [Validators.required]],
            code: [couponDTO.code || "", [Validators.required]],
            discount: [couponDTO.discount || "", [Validators.required]],
            discountType: [couponDTO.discountType || "", [Validators.required]],
            expiryDate: [couponDTO.expiryDate || "", [Validators.required]],
            maxRedemption: [couponDTO.maxRedemption || "", [Validators.required]],
            status: [couponDTO.status || "", Validators.required],
            autoGenerateCoupon: [couponDTO.autoGenerateCoupon || false, Validators.required]
        });
    }

    submit(couponDTO: CouponDTO) {
        if (this.couponForm.valid) {
            const couponData = this.couponForm.value;
            if (this.data.isNew) {
                this.couponService.addCoupon(couponData)
                    .pipe(takeUntil(this.ngUnsubscribe$))
                    .subscribe((response) => {
                        if (response.success) {
                            this.notificationService.showSuccess(
                                response.messages[0].message
                            )
                            this.dialogRef.close(response);
                        } else {
                            this.notificationService.showError(response.messages[0].message);
                        }
                    })
            } else {
                this.couponService
                    .editCoupon(couponDTO.id, couponDTO)
                    .pipe(takeUntil(this.ngUnsubscribe$))
                    .subscribe((response) => {
                        if (response.success) {
                            this.notificationService.showSuccess(
                                response.messages[0].message
                            );
                            this.dialogRef.close(response);
                        } else {
                            this.notificationService.showError(response.messages[0].message);
                        }
                    });
            }
        }
    }

    convertToNumber(str: string): number {
        return str == "Y" ? 1 : 0;
    }

    onSelectedIntervalOption(option: LableValueModel) {
        this.membershipPlanForm.controls["interval"].setValue(option.name);
    }

    onSelectedStatusOption(option: LableValueModel) {
        this.membershipPlanForm.controls["status"].setValue(option.name);
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
