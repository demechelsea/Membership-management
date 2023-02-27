import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function  acceptOnlyNumbers($event) {
    const keyCode = $event.keyCode;

    const excludedKeys = [8, 37, 39, 46];

    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      $event.preventDefault();
    }
  }

