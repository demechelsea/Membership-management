import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageWrapModel } from 'app/models/messageWrapModel';
import { PageModel } from 'app/models/page-model';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent  {

  public messages:MessageWrapModel = new MessageWrapModel();
  public page:PageModel = new PageModel();

  constructor() { }



}
