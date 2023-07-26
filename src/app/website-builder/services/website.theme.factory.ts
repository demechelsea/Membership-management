import { Injectable } from '@angular/core';
import { WebsiteThemeService } from './website.theme.service.';
import { YellowThemeServiceImpl } from './yellow.theme.service.impl';
import { BlueThemeServiceImpl } from './blue.theme.service.impl';
import { LocalstorageService } from 'app/common/services/localstorage.service';
import { PlainThemeServiceImpl } from './plain.theme.service.impl';

@Injectable({
  providedIn: 'root'
})
export class WebsiteThemeFactory {
  
  constructor(
    private localStorageService: LocalstorageService) {

  }

  getWebsiteBuilderTheme(name: string): WebsiteThemeService {
    switch (name) {
      case 'Yellow Theme':
        return new YellowThemeServiceImpl(this.localStorageService.getAssociation());
      case 'Blue Theme':
        return new BlueThemeServiceImpl(this.localStorageService.getAssociation());
        case 'Plain Theme':
        return new PlainThemeServiceImpl(this.localStorageService.getAssociation());
      default:
        throw new Error('Undefined Theme');
    }
  }

}