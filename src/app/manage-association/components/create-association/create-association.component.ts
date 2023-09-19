import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { LookupService } from 'app/common/services/lookup.service';
import { ValidatorService } from 'app/common/services/validator.service';
import { SoraxValidators } from 'app/common/utils/sorax-validators';
import LableValueModel from 'app/models/lable-value-model';
import { BaseComponent } from 'app/core/components/base/base.component';
import { Subject, takeUntil } from 'rxjs';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { MatButton } from '@angular/material/button';
import { AssociationModel } from 'app/models/association-model';
import { AssociationService } from 'app/auth/service/association.service';
import { NotificationService } from 'app/common/services/notification.service';
import { AssociationSetting } from 'app/models/association-setting';


@Component({
  selector: 'app-create-association',
  templateUrl: './create-association.component.html',
  styleUrls: ['./create-association.component.scss']
})
export class CreateAssociationComponent extends BaseComponent implements OnInit, AfterViewInit {

  private ngUnsubscribe$ = new Subject<void>();
  @ViewChild(MatButton) submitButton: MatButton;

  languageOptionsKey: string = LookupService.LANGUAGES;
  currencyOptionsKey: string = LookupService.CURRENCIES;
  dateFormatOptionsKey: string = LookupService.DATE_FORMATS;
  timeZoneOptionsKey: string = LookupService.TIMEZONES;


  createAssociationForm: UntypedFormGroup;
  isFormValid: boolean = false;

  constructor(private associationService: AssociationService,
    private loader: AppLoaderService,
    private notificationService: NotificationService,
    private validatorService: ValidatorService) {
    super();
  }

  ngOnInit() {
    this.createAssociationForm = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      place: new UntypedFormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        asyncValidators: [this.validatorService.validateAssoicationPlaceName('name')]
      }),
      shortName: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      website: new UntypedFormControl('', [SoraxValidators.isValidWebSite]),
      soceityRaxUrl: new UntypedFormControl('', {
                      validators: [Validators.required, Validators.minLength(3)],
                      asyncValidators: [this.validatorService.validateAssociationSubDomain()]
                    }),
      timeZoneKey: new UntypedFormControl('Asia/Calcutta',[]),
      timeZoneValue: new UntypedFormControl('Asia/Calcutta', [Validators.required]),
      languageKey: new UntypedFormControl('', [Validators.required]),
      currencyKey: new UntypedFormControl('',  [Validators.required]),
      dateFormat: new UntypedFormControl('dd/MM/yyyy', [Validators.required]),
      agreed: new UntypedFormControl(false, [Validators.requiredTrue]),
    });
  }

  displayWithLocalText(option: any): string {
    return `${option.name} (${option.localName})`;
  }


  onSelectedTimeZoneOption(option: LableValueModel) {
    this.createAssociationForm.controls["timeZoneValue"].setValue(option.name);
    this.createAssociationForm.controls["timeZoneKey"].setValue(option.id);
  }

  submitForm() {
    if (this.createAssociationForm.valid) {
      const associationModel = this.mapFormDataToAssociation(this.createAssociationForm.value);

      this.associationService.createNewAssociation(associationModel)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(
          (response) => {
            if (response.isSuccess) {
              console.log('Association registration complted');
              //navigate to Mapped assoications
              this.notificationService.showSuccess(response.messages[0].message);
            } else {
              this.notificationService.showError(response.messages[0].message);
            }
          });
    } else {
      this.notificationService.showWarning(
        "Please fill in all the required fields."
      );
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.loader.close();
  }

  mapFormDataToAssociation(formData: any): AssociationModel {
    let associationModel =  new AssociationModel();
    associationModel = { ...associationModel, ...formData };
    associationModel = { ...associationModel.setting, ...formData };

    //  const settings:AssociationSetting = new AssociationSetting();
    //  settings.timeZone = formData.timeZone;
    //  settings.language = formData.language;
    //  settings.currency = formData.currency;
    //  settings.dateFormat = formData.dateFormat;
    //  associationModel.setting = settings;

    return associationModel;
  }

  ngAfterViewInit() {
   // this.initilizeDefaults();

  }

  initilizeDefaults(): void {
    this.createAssociationForm.controls["currencyKey"].setValue('2');
    this.createAssociationForm.controls["languageKey"].setValue('2');
    //this.createAssociationForm.controls["dateFormat"].setValue();
  }

}