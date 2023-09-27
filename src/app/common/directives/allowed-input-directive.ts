import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[soraxAllowedInput]'
})
export class AllowedInputDirective {
  @Input('soraxAllowedInput') allowedPattern: string;

  constructor(private el: ElementRef, private ngControl: NgControl) { }

  @HostListener('blur') onBlur() {
    this.trimValue();
  }


  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value;


    // Create a regex pattern from the provided input
    const regexPattern = new RegExp(this.allowedPattern, 'g');

    // Filter the input to only contain allowed characters
    inputValue = inputValue.match(regexPattern)?.join('') || '';

    inputValue =  inputValue.replace(/\s+/g, ' ');

    // Update the input value and form control value
    inputElement.value = inputValue;
    this.ngControl.control.setValue(inputValue);
  }

  private trimValue() {
    const inputValue = this.el.nativeElement.value;
    this.el.nativeElement.value = inputValue.trim();
  }
}
