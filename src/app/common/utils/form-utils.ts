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

  export function splitArrayIntoGroups<T>(inputArray: T[], groupSize: number): T[][] {
    const groups: T[][] = [];
    let currentGroup: T[] = [];
  
    for (let i = 0; i < inputArray.length; i++) {
      let item = inputArray[i];
      currentGroup.push(item);
  
      if (currentGroup.length === groupSize) {
        groups.push(currentGroup);
        currentGroup = [];
      }
    }  
    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }
  
    return groups;
  }

