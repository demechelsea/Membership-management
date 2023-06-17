import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm',
  template: `<div class="box"><h1 matDialogTitle class="mb-8">{{ data.title }}</h1>
    <div mat-dialog-content class="mb-16">{{ data.message }}</div>
    <div mat-dialog-actions class="pb-16">
    <button
    type="button"
    mat-raised-button
    color="primary"
    (click)="dialogRef.close(true)">OK</button>
     
    <span fxFlex></span>
    <button
    type="button"
    color="accent"
    mat-raised-button
    (click)="dialogRef.close(false)">Cancel</button>
    </div></div>`,
  styles: [`
    .box {
      padding: 10px;
    }
  `]
})
export class AppComfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<AppComfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}
}
