import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
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
      useValue: { VALIDATION_MESSAGES }
    },

  ]
})
export class SoraxFormFieldComponent implements OnInit, AfterViewInit {

  @Input("label") public label: string;
  @Input("prefix") public prefix: string;
  @Input("suffix") public suffix: string;
  @Input("prefixText") public prefixText: string;
  @Input("suffixText") public suffixText: string;
  @Input("exClass") public exClass: string;
  @Input("soraxFormControl") public soraxFormControl: FormControl;
  @ContentChild('soraxInput', { static: false }) myInput: ElementRef;


  constructor(private renderer: Renderer2) { }

  @ContentChild(MatFormFieldControl, { static: true })
  public formFieldControl: MatFormFieldControl<any>;

  @ViewChild('materialFormField', { static: true })
  public matFormField: MatFormField;

  public ngOnInit() {
    this.matFormField._control = this.formFieldControl;
  }

  ngAfterViewInit(): void {
    if (this.myInput) {
      const inputElement = this.myInput.nativeElement;
      this.renderer.addClass(inputElement, 'mat-mdc-form-field-input-control');
      this.renderer.addClass(inputElement, 'mdc-text-field__input');
    }

  }

}