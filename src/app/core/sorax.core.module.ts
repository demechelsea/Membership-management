import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseComponent } from 'app/core/components/base/base.component';

@NgModule({
  declarations: [  
    BaseComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[ 
    
    BaseComponent,
  ]
})
export class SoraxCoreModule { }
