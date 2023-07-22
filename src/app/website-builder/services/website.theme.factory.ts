import { Injectable } from '@angular/core';
import { WebsiteThemeService } from './website.theme.service.';
import { YellowThemeServiceImpl } from './yellow.theme.service.impl';
import { BlueThemeServiceImpl } from './blue.theme.service.impl';

@Injectable({
  providedIn: 'root'
})
export class WebsiteThemeFactory {

  getWebsiteBuilderTheme(name: string): WebsiteThemeService {
    switch (name) {
      case 'yellow':
        return new YellowThemeServiceImpl();
      case 'blue':
        return new BlueThemeServiceImpl();
      default:
        throw new Error('Undefined Theme');
    }
  }

}