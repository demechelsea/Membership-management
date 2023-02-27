import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router'
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { LayoutService } from 'app/layouts/services/layout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  // private homePS: PerfectScrollbar;
  constructor(
    private router: Router,
    private loader: AppLoaderService,
    public layout: LayoutService
  ) { }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    // if (this.homePS) this.homePS.destroy();
    this.loader.close();
  }
  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.homePS = new PerfectScrollbar('.scrollable')
    // });
  }

  goToLogin() {
    this.loader.open();
    this.router.navigateByUrl('/auth/login')
  }
}
