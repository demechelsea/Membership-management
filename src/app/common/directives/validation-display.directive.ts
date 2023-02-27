import { Directive, ElementRef, HostBinding, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { merge, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { SORAX_VALIDATION_MESSAGES_KEY, VALIDATION_MESSAGES } from '../utils/sorax-validators';
import { formatString } from '../utils/string-utils';

@Directive({
  selector: '[soraxdir-validation-display]',
 
 
})

export class ValidationDisplayDirective  implements OnInit, OnDestroy {
  @Input('soraxValidationFormControl') public soraxValidationFormControl: FormControl;
  @Input() public fieldName: string;
  
  public errorMessage$: Subscription;

  constructor(private element: ElementRef, 
          @Inject(SORAX_VALIDATION_MESSAGES_KEY) private messages) {
              this.messages=VALIDATION_MESSAGES;
    }

  public ngOnInit(): void {
    if (isNullOrUndefined(this.soraxValidationFormControl)) { return; }

    // this.errorMessage$ = merge(
    //   this.soraxValidationFormControl.valueChanges,
    //   this.soraxValidationFormControl.statusChanges
    // )

    this.errorMessage$ = this.soraxValidationFormControl.valueChanges.pipe(
      debounceTime(75),
      map(() => {
        const { dirty, invalid, touched } = this.soraxValidationFormControl;
        return (dirty || touched) && invalid ? this.getErrorMessage() : '';
      })
    ).subscribe(message => {
      // const { style, innerText } = this.element.nativeElement;
      this.element.nativeElement.innerText = message ||'';
    });
    
  }

  public ngOnDestroy(): void {
    if (this.errorMessage$) {
      this.errorMessage$.unsubscribe();
    }
  }
  
  public getErrorMessage(): string {
   
    const {
      soraxValidationFormControl: { errors, value },
      fieldName,
      messages
    } = this;
   
    if (!errors) { return; }

    for (const key in messages) {

      if (!errors.hasOwnProperty(key)) { continue; }
      

      const message = messages[key];

      if (isNullOrUndefined(messages[key])) {
        return `No message found for ${key} validator.`;
      }

      const messageData = {
        ...errors[key],
        value,
        fieldName
      };

      return formatString(message, messageData);
    }
     throw new Error('No Error Message Found In the dictionary of error messages.');
  }

  // public ngAfterContentChecked() {
  //   console.log(" Content checked");
    
  // }

  // public ngDoCheck() {
  //   console.log(" Do check");
    
  // }

  
  
}