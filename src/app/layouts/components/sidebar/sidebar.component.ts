import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ILayoutConf, LayoutService } from 'app/layouts/services/layout.service';
import { AssociationModel } from 'app/models/association-model';
import { Subscription } from 'rxjs';

import { NavigationService } from '../../../shared/services/navigation.service';
import { ThemeService } from '../../../shared/services/theme.service';
import { LocalstorageService } from 'app/common/services/localstorage.service';

@Component({
  selector: "app-sidebar-side",
  templateUrl: "./sidebar.component.html"
})
export class SidebarComponent implements OnInit, OnDestroy, AfterViewInit {
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  public layoutConf: ILayoutConf;

  constructor(
    private navService: NavigationService,
    public themeService: ThemeService,   
    private layout: LayoutService) {}

  ngOnInit() {
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem;
      //Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(
        item => item.type === "icon"
      ).length;
    });
    this.layoutConf = this.layout.layoutConf;
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
  }

  toggleCollapse() {
    if (
      this.layoutConf.sidebarCompactToggle
    ) {
        this.layout.publishLayoutChange({
        sidebarCompactToggle: false
      });
    } else {
        this.layout.publishLayoutChange({
            // sidebarStyle: "compact",
            sidebarCompactToggle: true
          });
    }
  }
}
