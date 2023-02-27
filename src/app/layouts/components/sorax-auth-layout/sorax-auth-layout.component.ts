import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sorax-auth-layout',
  templateUrl: './sorax-auth-layout.component.html'
})
export class SoraxAuthLayoutComponent implements OnInit {

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
