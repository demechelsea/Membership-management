import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { SORAX_VALIDATION_MESSAGES_KEY, VALIDATION_MESSAGES } from 'app/common/utils/sorax-validators';

@Component({
  selector: 'sorax-form-field',
  templateUrl: './sorax-form-field.component.html',
  styleUrls: ['./sorax-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { 
      provide: SORAX_VALIDATION_MESSAGES_KEY, 
      useValue: {VALIDATION_MESSAGES}
    }
   
 ]
})
export class SoraxFormFieldComponent implements OnInit {
  @Input("label") public label: string;
  @Input("exClass") public exClass: string;
  @Input("soraxFormControl") public soraxFormControl: FormControl;

  @ContentChild(MatFormFieldControl, { static: true })
  public formFieldControl: MatFormFieldControl<any>;

  @ViewChild('materialFormField', { static: true })
  public matFormField: MatFormField;

  public ngOnInit() {
    this.matFormField._control = this.formFieldControl;
  }

}