import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SoraxAnimations } from 'app/common/animations/sorax-animations';

@Component({
  selector: 'sorax-plain-layout',
  templateUrl: './sorax-plain-layout.component.html'
})
export class SoraxPlainLayoutComponent implements OnInit {

  constructor(
    public translate: TranslateService,
  ) { 
    // Translator init
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
  }

}
