import { Component, OnInit, EventEmitter, Input, ViewChildren  , Output, Renderer2 } from '@angular/core';
import { ThemeService } from '../../../shared/services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { JwtAuthService } from '../../../shared/services/auth/jwt-auth.service';
import { EgretNotifications2Component } from '../../../shared/components/egret-notifications2/egret-notifications2.component';
import { LoginService } from 'app/auth/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-side',
  templateUrl: './header.template.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() notificPanel;
  @ViewChildren(EgretNotifications2Component) noti;
  public availableLangs = [{
    name: 'English  ',
    code: 'en',
    flag: 'us'
  }, {
    name: 'Telugu',
    code: 'te',
    flag: 'es'
  }];
  currentLang = this.availableLangs[0];

  public egretThemes;
  public layoutConf: any;
  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    public translate: TranslateService,
    private renderer: Renderer2,
    public jwtAuth: JwtAuthService,
    private loginService: LoginService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.egretThemes = this.themeService.egretThemes;
    this.layoutConf = this.layout.layoutConf;
    this.translate.use(this.currentLang.code);
  }
  setLang(lng) {
    this.currentLang = lng;
    this.translate.use(lng.code);
  }
  changeTheme(theme) {
    // this.themeService.changeTheme(theme);
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      });
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    });
  }

  toggleCollapse() {
    // compact --> full
    if (this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full',
        sidebarCompactToggle: false
      }, {transitionClass: true});
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact',
      sidebarCompactToggle: true
    }, {transitionClass: true});

  }

  onSearch(e) {
    //   console.log(e)
  }

  logoutClicked(){
    this.loginService.logout();
    this.router.navigate(["auth/login"]);  }

}
