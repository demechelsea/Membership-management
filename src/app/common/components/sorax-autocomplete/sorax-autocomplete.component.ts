import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Self,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { LookupService } from 'app/common/services/lookup.service';
import { LableValueModel } from 'app/models/lable-value-model';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'sorax-autocomplete',
  templateUrl: './sorax-autocomplete.component.html',
  styleUrls: ['./sorax-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoraxAutocompleteComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input() placeholder: string;
  @Input() autoOptions: Observable<LableValueModel[]>;
  @Input() inputControl: FormControl;


  searchResults: Observable<any>;
  noResults = false;
  isLoading = false;

  private _lengthToTriggerSearch = 3
  isSearching: boolean;

  constructor(@Optional() @Self() private controlDir: NgControl,
    private changeDetectorRef: ChangeDetectorRef,
    public lookupService: LookupService,
  ) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this
    }
  }

  displayFn(result: LableValueModel): string | undefined {
    return result ? result.name : undefined
  }


  ngOnInit() {

    if (this.controlDir) {
      // Set validators for the outer ngControl equals to the inner
      const control = this.controlDir.control
      // Update outer ngControl status
      control.updateValueAndValidity({ emitEvent: false })
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.options) {
    //   if (this.isLoading) {
    //     this.isLoading = false
    //     if (
    //       !changes.options.firstChange &&
    //       !changes.options.currentValue.length
    //     ) {
    //       this.noResults = true
    //     } else {
    //       this.noResults = false
    //     }
    //   }
    // }
  }

  writeValue(obj: any): void {
    obj && this.inputControl.setValue(obj)
  }
  registerOnChange(fn: any): void {

    // // Pass the value to the outer ngControl if it has an id otherwise pass null
    // this.inputControl.valueChanges.pipe().subscribe({
    //   next: (value) => {
    //     if (typeof value === "string") {
    //       if (this.isMinLength(value)) {
    //         this.isSearching = true
    //         /**
    //          * Fire change detection to display the searching status option
    //          */
    //         this.changeDetectorRef.detectChanges()
    //         fn(value.toUpperCase())
    //       } else {
    //         this.isSearching = false
    //         this.noResults = false
    //         fn(null)
    //       }
    //     } else {
    //       fn(value)
    //     }
    //   },
    // })
  }


  registerOnTouched(fn: any): void {
    //this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.inputControl.disable() : this.inputControl.enable();
  }

  isMinLength(value: string) {
    return value.length >= this._lengthToTriggerSearch
  }
}
