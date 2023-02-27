import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/auth/service/login.service';
import { LayoutService } from 'app/layouts/services/layout.service';
import { AppLoaderService } from 'app/common/services/app-loader.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(  
    private router: Router,
    private loader: AppLoaderService,
    public layout: LayoutService) { }

  ngOnInit(): void {
  }

  goToLogin() {
    this.loader.open();
    this.router.navigateByUrl('/auth/login')
  }

}
