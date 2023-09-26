import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { LookupService } from 'app/common/services/lookup.service';
import { SORAX_VALIDATION_MESSAGES_KEY, SoraxValidators, VALIDATION_MESSAGES } from 'app/common/utils/sorax-validators';
import LableValueModel from 'app/models/lable-value-model';
import { Observable, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'sorax-form-select',
  templateUrl: './sorax-form-select.component.html',
  styleUrls: ['./sorax-fom-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: SORAX_VALIDATION_MESSAGES_KEY,
      useValue: { VALIDATION_MESSAGES }
    },

  ]
})
export class SoraxFormSelectComponent implements OnInit , AfterViewInit {

  @Input() id: number;

  @Input("prefix") public prefix: string;
  @Input("suffix") public suffix: string;
  @Input("exClass") public exClass: string;
  @Input("emptyOption") public emptyOption: boolean  = false;
  @Input() lookupName: string;
  @Input() placeholder: string;
  @Input() selectFormControl: UntypedFormControl;
  @Output() selectedOptionEmitter: EventEmitter<LableValueModel> = new EventEmitter<LableValueModel>();

  @Input() displayFn: (option: any) => string;

  private ngUnsubscribe$ = new Subject<void>();

  optionsList: any[];
  selectedOption:any;

  constructor(public lookupService: LookupService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initilizeFilteredOptions('');
  }


  ngAfterViewInit() {
    this.cdr.detectChanges(); 
  }

  private initilizeFilteredOptions(value: string) {
    this.lookupService.retrieveOptions(this.lookupName, value)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(data => {
          this.optionsList = data.result;
          this.cdr.detectChanges(); 
        }
      );
  }
  
  public onOptionSelected(event: any): void {
    const selectedOption = this.optionsList.find(option => (option.id == event.option.value
                                                                || option.code == event.option.value));
    this.selectedOptionEmitter.emit(selectedOption);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}


