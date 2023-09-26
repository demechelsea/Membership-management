import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, UntypedFormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LookupService } from 'app/common/services/lookup.service';
import { SORAX_VALIDATION_MESSAGES_KEY, SoraxValidators, VALIDATION_MESSAGES } from 'app/common/utils/sorax-validators';
import LableValueModel from 'app/models/lable-value-model';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'sorax-autocomplete',
  templateUrl: './sorax-autocomplete.component.html',
  styleUrls: ['./sorax-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: SORAX_VALIDATION_MESSAGES_KEY,
      useValue: { VALIDATION_MESSAGES }
    },

  ]
})
export class SoraxAutocompleteComponent implements OnInit {

  @Input() id: number;

  @Input("prefix") public prefix: string;
  @Input("suffix") public suffix: string;
  @Input("exClass") public exClass: string;
  @Input("requiredFlag") public requiredFlag: string = 'yes';
  @Input() lookupName: string;
  @Input() placeholder: string;
  @Input() formGroupName: string;
  @Input() autoCompleteFieldId: UntypedFormControl;
  @Input() autoCompleteFieldLabel: UntypedFormControl;
  @Output() selectedOptionEmitter: EventEmitter<LableValueModel> = new EventEmitter<LableValueModel>();
  @Input() displayFn: (option: any) => string;

  private ngUnsubscribe$ = new Subject<void>();

  filteredOptions: Observable<LableValueModel[]>;
  options: any[];

  constructor(public lookupService: LookupService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initilizeFilteredOptions('');
    this.addValidationRule();
  }


  ngAfterViewInit() {
    this.addValidationRule();
    this.cdr.detectChanges(); 

  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedOption = this.options.find(option => (option.id == event.option.value
                                                          || option.code == event.option.value));
    this.selectedOptionEmitter.emit(selectedOption);
    this.setAutoControlIdLabel(selectedOption);
  }

  public validateOnFocusOut(event: any) {
    this.resetInputControlValue();
    this.addValidationRule();
  }

  private initilizeFilteredOptions(value: string) {
    this.lookupService.retrieveOptions(this.lookupName, value)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(data => {
        this.options = data.result;
        this.filteredOptions = this.autoCompleteFieldLabel.valueChanges
          .pipe(startWith(''),
            map(value => {
              this.resetInputControlValue();
              return this.filterOptionsByValue('' + value);
            })
          );
        this.prepolulateAutoComplete();
      }
      );
  }


  private filterOptionsByValue(value: string): LableValueModel[] {
    const filterValue: string = value.toLowerCase();
    if (this.options == null) {
      return null;
    }
    const filteredOptions = this.options.filter(option => {
      if (option.name) {

        return option.name.toLowerCase().includes(filterValue) 
                || option.localName.toLowerCase().includes(filterValue);

      } else if (option.positionName) {

        return option.positionName.toLowerCase().includes(filterValue);

      } else if (option.planName) {

        return option.planName.toLowerCase().includes(filterValue);

      } else if (option.userDetail) {
        return (`${option.userDetail.firstName} ${option.userDetail.givenName} 
        ${option.userDetail.parentName} ${option.userDetail.primaryEmail}
        ${option.userDetail.primaryPhone} ${option.userDetail.parentName}`).toLowerCase().includes(filterValue);
      }

    });
    return filteredOptions;
  }
  private resetInputControlValue() {
    if (this.autoCompleteFieldId) {
      this.autoCompleteFieldId.setValue('');
    }
  }
  private prepolulateAutoComplete(): void {
    this.setAutoControlIdLabel(this.findOptionByIdOrName());
    this.addValidationRule();
  }

  private findOptionByIdOrName() {
    if (this.autoCompleteFieldId) {
      return this.options.find(option => (option.id == this.autoCompleteFieldId.value ||
        option.code == this.autoCompleteFieldId.value));
    }
    return this.options.find(option => (option.name == this.autoCompleteFieldLabel.value));
  }

  private setAutoControlIdLabel(option: any) {
    if (option == null) {
      return null;
    }
    if (option) {
      if (this.autoCompleteFieldId) {
        this.autoCompleteFieldId.setValue(option.code ? option.code : option.id);
      }
      this.autoCompleteFieldLabel.setValue(option.name);
    }
    if (option.positionName) {
      this.autoCompleteFieldLabel.setValue(option.positionName);
    }
    if (option.planName) {
      this.autoCompleteFieldLabel.setValue(option.planName);
    }
    if (option.userDetail) {
      this.autoCompleteFieldLabel.setValue(`${option.userDetail.firstName} ${option.userDetail.givenName} 
      ${option.userDetail.parentName}`);
    }
  }

  private addValidationRule() {
    if (this.options) {
      if (this.requiredFlag == 'yes') {
        this.autoCompleteFieldLabel.setValidators([Validators.required, SoraxValidators.isValidOption(this.options)]);
      } else {
        this.autoCompleteFieldLabel.setValidators([SoraxValidators.isValidOption(this.options)]);
      }
      this.autoCompleteFieldLabel.updateValueAndValidity();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}


