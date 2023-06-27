import { Injectable } from '@angular/core';
import { WebsiteThemeService } from './website.theme.service.';
import { YummyThemeServiceImpl } from './yummy.theme.service.impl';

@Injectable({
  providedIn: 'root'
})
export class WebsiteThemeFactory {

  getWebsiteBuilderTheme(name: string): WebsiteThemeService {
    switch (name) {
      case 'yummy':
        return new YummyThemeServiceImpl();
      default:
        throw new Error('Undefined Theme');
    }
  }

}