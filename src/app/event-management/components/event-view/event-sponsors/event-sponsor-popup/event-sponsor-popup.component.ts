import {ChangeDetectorRef, Component, Inject, OnInit} from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LookupService} from "app/common/services/lookup.service";
import {BaseComponent} from "app/core/components/base/base.component";
import LableValueModel from "app/models/lable-value-model";
import {Subject, takeUntil} from "rxjs";
import {LocalstorageService} from "app/common/services/localstorage.service";
import {NotificationService} from "app/common/services/notification.service";
import {ResultViewModel} from "../../../../../models/result-view-model";
import EventTicketDTO from "../../../../../models/event/eventTicketDTO";
import {EventService} from "../../../../services/event-service/event.service";
import EventTicketIssuedDTO from "../../../../../models/event/eventTicketIssuedDTO";
import EventSponsorDTO from "../../../../../models/event/eventSponsorDTO";
import {CommitteePositionDTO} from "../../../../../models/committeePositionDTO";
import {
    PositionPopupComponent
} from "../../../../../association-settings/components/committee/position-popup/position-popup.component";
import {AddCompanyPopupComponent} from "../event-sponsor-list/add-company-popup/add-company-popup.component";
import {CompanyService} from "../../../../services/event-service/company.service";
import CompanyDTO from "../../../../../models/CompanyDTO";


@Component({
    selector: "app-event-sponsor-popup",
    templateUrl: "./event-sponsor-popup.component.html",
})
export class EventSponsorPopupComponent extends BaseComponent implements OnInit {

    private ngUnsubscribe$ = new Subject<void>();
    private resultViewModel: ResultViewModel = new ResultViewModel();
    public sponsorForm: FormGroup;
    public intervals: LableValueModel[] = [];
    public isLoading: boolean;

    availableStatus = [{
        name: "Draft",
        value: "DRAFT"
    }, {
        name: "Active",
        value: "ACTIVE"
    }, {
        name: "Deleted",
        value: "DELETED"
    }]

    sponsorTypes = [{
        name: "Money",
        value: "MONEY"
    }, {
        name: "Service",
        value: "SERVICE"
    }]

    buttonText = "Add Sponsor";
    availableCompanyOptions: CompanyDTO[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<EventSponsorPopupComponent>,
        public lookupService: LookupService,
        private formBuilder: FormBuilder,
        private cdRef: ChangeDetectorRef,
        private eventService: EventService,
        private companyService: CompanyService,
        private localStorageService: LocalstorageService,
        private notificationService: NotificationService,
        private dialog: MatDialog
    ) {
        super();
        this.buttonText = data.isNew ? "Add Sponsor" : "Edit Sponsor";
    }

    ngOnInit() {
        this.getCompanies();
        this.buildSponsorForm(this.data.payload);
        this.cdRef.detectChanges();
    }

    buildSponsorForm(eventSponsorDTO: EventSponsorDTO) {
        const isUpdate = !this.data.isNew;
        this.sponsorForm = this.formBuilder.group({
            id: [isUpdate ? eventSponsorDTO.id : null, isUpdate ? Validators.required : []],
            encryptedId: [isUpdate ? eventSponsorDTO.encryptedId : null, isUpdate ? Validators.required : []],
            name: [eventSponsorDTO.name || "", [Validators.required, Validators.minLength(3)]],
            sponsorshipType: [eventSponsorDTO.sponsorshipType || "", [Validators.required, Validators.minLength(3)]],
            description: [eventSponsorDTO.description || ""],
            paymentMethod: [eventSponsorDTO.paymentMethod || "", Validators.required],
            // paymentDate: [eventSponsorDTO.paymentDate || "", Validators.required],
            companyId: [eventSponsorDTO.companyId || "", [Validators.required]],
            companyEmail: [{value: "", disabled: true}, [Validators.required]],
            companyPhone: [{value: "", disabled: true}, [Validators.required]],
            status: [eventSponsorDTO.status || "", [Validators.required]]
        });
    }

    submit() {
        if (this.sponsorForm.valid) {
            const sponsorData = this.sponsorForm.value;
            sponsorData.encryptedEventId = this.data.eventId;
            if (this.data.isNew) {
                this.eventService.addEventSponsor(sponsorData)
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
                this.eventService
                    .editEventSponsor(sponsorData)
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

    getCompanies(){
        this.companyService.getCompanies()
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((response) => {
            Object.assign(this.resultViewModel, response);
            this.availableCompanyOptions = this.resultViewModel.result;
        })
    }

    onCompanyChanged(){
        let companyId = this.sponsorForm.controls['companyId'].value;
        let selectedCompany = this.availableCompanyOptions.find(c => c.id === companyId);
        this.sponsorForm.controls['companyEmail'].setValue(selectedCompany.email);
        this.sponsorForm.controls['companyPhone'].setValue(selectedCompany.phone);
    }

    convertToNumber(str: string): number {
        return str == "Y" ? 1 : 0;
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }

    openAddCompanyPopUp(){
        let title = "Add a new Company";
        let dialogRef: MatDialogRef<AddCompanyPopupComponent> = this.dialog.open(
            AddCompanyPopupComponent,
            {
                width: "720px",
                disableClose: true,
                data: { title: title},
            }
        );
        dialogRef.afterClosed().subscribe((res) => {
            if (!res) {
                console.log("no res", res);
                return;
            }
            this.availableCompanyOptions.push(res.result);
            this.sponsorForm.controls['companyId'].setValue(res.result.id);
            this.onCompanyChanged();
        });
    }
}

function positiveNumberValidator(control: FormControl) {
    const value = control.value;
    if (value === null || value === "") {
        return null;
    }
    if (isNaN(value) || value <= 0) {
        return {positiveNumber: true};
    }
    return null;
}
