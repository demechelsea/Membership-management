import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import LableValueModel from 'app/models/lable-value-model';

export const VALIDATION_MESSAGES = {
  required: '{{fieldName}} is required.',
  equalTo: "{{fieldName}} is is not matched.",
  email: '{{fieldName}} is in an invalid format',
  emailAddressTaken: '{{fieldName}} {{emailAddress.value}} is already used.',
  minlength: "{{fieldName}} length must be minimum {{requiredLength}} ",
  maxlength: "{{fieldName}} length must not be more than {{requiredLength}}",
  otpValidator: "{{fieldName}} must be a  6 digit number",
  number: "{{fieldName}} must be a number.",
  invalidOption: "Please select validation option",
};

export const SORAX_VALIDATION_MESSAGES_KEY = 'VALIDATION_MESSAGES_INJECTION_KEY';


export class SoraxValidators {
  static requiredTrue = Validators.requiredTrue;

  static userNameValidator = [
    SoraxValidators.phoneEmail,
    Validators.maxLength(60),
    Validators.minLength(3),
    Validators.required,
  ];

  static passwordValidator = [
    Validators.required,
    Validators.maxLength(25),
    Validators.minLength(8),
    //  Validators.pattern()
  ];

  static phoneEmail(control: AbstractControl): ValidationErrors | null {
    return SoraxValidators.phoneEmailValidatorFn(10, 14)(control);
  }

  static otpValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value && isNaN(control.value)) {
      return { otpValidator: true };
    }
    if (control.value && control.value.length != 6) {
      return { otpValidator: true };
    }
  }

  private static phoneEmailValidatorFn(minLength: number, maxLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && isNaN(control.value)) {
        return Validators.email(control);
      } else {
        return Validators.compose([Validators.minLength(minLength),
        Validators.maxLength(maxLength)])(control);
      }
    }
  }

  //TOBE:TESTED
  //conditionalValidator(() => this.myForm.get('myCheckbox').value, pattern(/.+@.+\..+/),)
  static conditionalValidator(predicate, validator) {
    return (formControl => {
      if (!formControl.parent) {
        return null;
      }
      if (predicate()) {
        return validator(formControl);
      }
      return null;
    })
  }

  static isValidOption(validOptions: any[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const selectedOption = validOptions.find(option => {
        if (option.name) {
          return option.name === value;
        }
        else if (option.positionName) {
          return option.positionName === value;
        }
        else if (option.planName) {
          return option.planName === value;
        }
        else if (option.userDetail) {
          return `${option.userDetail.firstName} ${option.userDetail.givenName} ${option.userDetail.parentName}` === value;
        }
      });
      return selectedOption ? null : { 'invalidOption': true };
    };
  }
  
}

export const isEmptyOrWhiteSpace = (value: any) => {
  return false;
}

export const requiredIf = (predicate: (ctrl: AbstractControl) => boolean, independentFieldName: string): ValidatorFn | null => {
  return (ctrl: AbstractControl): ValidationErrors | null => {
    if (predicate(ctrl) && isEmptyOrWhiteSpace(ctrl.value)) {
      return {
        requiredIf: {
          anotherField: independentFieldName
        }
      };
    }

    return null;
  }
}
