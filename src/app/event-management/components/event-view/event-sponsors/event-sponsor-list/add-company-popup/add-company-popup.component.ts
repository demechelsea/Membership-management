import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LookupService } from "app/common/services/lookup.service";
import { BaseComponent } from "app/core/components/base/base.component";
import LableValueModel from "app/models/lable-value-model";
import { Observable, Subject, takeUntil } from "rxjs";
import { LocalstorageService } from "app/common/services/localstorage.service";
import { NotificationService } from "app/common/services/notification.service";
import CompanyDTO from "../../../../../../models/CompanyDTO";
import {CompanyService} from "../../../../../services/event-service/company.service";

@Component({
    selector: "app-company-popup",
    templateUrl: "./add-company-popup.component.html",
})
export class AddCompanyPopupComponent extends BaseComponent implements OnInit {

    private ngUnsubscribe$ = new Subject<void>();
    public addCompanyForm: FormGroup;
    public intervals: LableValueModel[] = [];
    public isLoading: boolean;
    public noResults: boolean;
    filteredIntervals$: Observable<LableValueModel[]>;

    buttonText: string;
    title: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<AddCompanyPopupComponent>,
        public lookupService: LookupService,
        private formBuilder: FormBuilder,
        private cdRef: ChangeDetectorRef,
        private companyService: CompanyService,
        private localStorageService: LocalstorageService,
        private notificationService: NotificationService
    ) {
        super();
        this.buttonText = "Add Company";
        this.title = "Add Company";
    }

    ngOnInit() {
        this.buildAddCompanyForm();
        this.cdRef.detectChanges();
    }

    buildAddCompanyForm() {
        this.addCompanyForm = this.formBuilder.group({
            name: ["", [Validators.required, Validators.minLength(3)],],
            email: ["", [Validators.required, Validators.email]],
            phone: ["", Validators.required]
        });
    }

    submit() {
        if (this.addCompanyForm.valid) {
            const companyDTO = this.addCompanyForm.value;
            this.companyService.addCompany(companyDTO)
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe((response) => {
                    if (response.success){
                        this.notificationService.showSuccess(
                            response.messages[0].message
                        )
                        this.dialogRef.close(response);
                    }
                    else {
                        this.notificationService.showError(response.messages[0].message);
                    }
                })
        }
    }
    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
