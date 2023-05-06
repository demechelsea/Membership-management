import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LookupService } from 'app/common/services/lookup.service';
import { SoraxValidators } from 'app/common/utils/sorax-validators';
import LableValueModel from 'app/models/lable-value-model';
import { map, Observable, startWith, Subject, Subscription, takeUntil } from 'rxjs';


@Component({
  selector: 'sorax-autocomplete',
  templateUrl: './sorax-autocomplete.component.html',
  styleUrls: ['./sorax-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoraxAutocompleteComponent implements OnInit {
  @Input() lookupName: string;
  @Input() placeholder: string;
  @Input() autoCompleteFieldId: FormControl;
  @Input() autoCompleteFieldLabel: FormControl;
  @Output() selectedOptionEmitter: EventEmitter<LableValueModel>
    = new EventEmitter<LableValueModel>();

  @Input() displayFn: (option: any) => string;
  private ngUnsubscribe$ = new Subject<void>();

  filteredOptions: Observable<LableValueModel[]>;
  options: LableValueModel[];

  constructor(public lookupService: LookupService) {
  }


  ngOnInit() {
    this.initilizeFilteredOptions('');
    this.addValidationRule();
  }

  ngAfterViewInit() {
    this.addValidationRule();
  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedOption = this.options.find(option => option.id === event.option.value);
    this.selectedOptionEmitter.emit(selectedOption);
    this.setAutoControlIdLabel(selectedOption)
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
        .pipe(
          startWith(''),
          map(value => {
            this.resetInputControlValue();
            return this.filterOptionsByValue(value);
          })
        );
      this.prepolulateAutoComplete();
    });
  }

  private filterOptionsByValue(value: string): LableValueModel[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
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
      return this.options.find(option => (option.id == this.autoCompleteFieldId.value));
    }
    return this.options.find(option => (option.name == this.autoCompleteFieldLabel.value));
  }

  private setAutoControlIdLabel(option: LableValueModel) {
    if (option) {
      if (this.autoCompleteFieldId) {
        this.autoCompleteFieldId.setValue(option.id);
      }
      this.autoCompleteFieldLabel.setValue(option.name);
    }
  }

  private addValidationRule() {
    if (this.options) {
      this.autoCompleteFieldLabel.setValidators([Validators.required, SoraxValidators.isValidOption(this.options)]);
      this.autoCompleteFieldLabel.updateValueAndValidity();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}


