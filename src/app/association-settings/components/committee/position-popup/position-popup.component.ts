import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BaseComponent } from "app/core/components/base/base.component";
import LableValueModel from "app/models/lable-value-model";
import { Observable, Subject, takeUntil } from "rxjs";
import { PositionService } from "app/association-settings/services/position-service/position.service";
import { CommitteePositionDTO } from "app/models/committeePositionDTO";
import CommitteeDTO from "app/models/committeeDTO";
import { AppConfirmService } from "app/common/services/app-confirm.service";
import { NotificationService } from "app/common/services/notification.service";
import { AssociationDTO } from "app/models/AssociationDTO";

@Component({
  selector: "app-component-popup",
  templateUrl: "./position-popup.component.html",
})
export class PositionPopupComponent extends BaseComponent implements OnInit {
  private ngUnsubscribe$ = new Subject<void>();
  public positionForm: FormGroup;
  public isLoading: boolean;
  public noResults: boolean;
  filteredIntervals$: Observable<LableValueModel[]>;

  buttonText = "Create a position";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PositionPopupComponent>,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private positionService: PositionService,
    private confirmService: AppConfirmService,
    private notificationService: NotificationService
  ) {
    super();
    this.buttonText = data.isNew ? "Create a position" : "Update position";
  }

  ngOnInit() {
    this.buildpositionForm(this.data.payload);
    this.cdRef.detectChanges();
  }

  buildpositionForm(planData: CommitteePositionDTO) {
    planData.association = new AssociationDTO();
    const isUpdate = !this.data.isNew;
    this.positionForm = this.formBuilder.group({
      id: [isUpdate ? planData.id : null, isUpdate ? Validators.required : []],
      positionName: [planData.positionName || "", Validators.required],
      positionRank: [planData.positionRank || null, Validators.required],
      assocation: [planData.association || ""],
    });
  }

  submit(committeePosition: CommitteePositionDTO) {
    console.log("position object:", committeePosition);
    if (this.positionForm.valid) {
      const formData = this.positionForm.value;
      if (!this.data.isNew) {
        this.confirmService
          .confirm({
            message: `Members will be affected by editing. Are you sure you want to update this position?`,
          })
          .subscribe((result) => {
            if (result) {
              this.positionService
                .updatePosition(committeePosition.id, formData)
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe((response) => {
                  if (response.success) {
                    this.notificationService.showSuccess(
                      response.messages[0].message
                    );
                    this.dialogRef.close(response);
                  } else {
                    this.notificationService.showError(
                      response.messages[0].message
                    );
                  }
                });
            }
          });
      } else {
        this.positionService
          .createPosition(formData)
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
    } else {
      this.notificationService.showWarning(
        "Please fill in all the required fields."
      );
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
