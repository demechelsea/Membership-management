import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'app/auth/service/login.service';
import { BaseService } from 'app/common/services/base.service';
import { BaseComponent } from 'app/core/components/base/base.component';
import { soraxAnimations } from 'app/common/animations/sorax-animations';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  animations: soraxAnimations
})
export class AdminDashboardComponent extends BaseComponent implements OnInit {

  constructor(private formBuilder: FormBuilder
              , public loginService: LoginService
              , private router:Router
              ,private route:ActivatedRoute) { 
    super();
  }

  ngOnInit(): void {
    this.messages =BaseService.baseMessages;
    console.log("Dashboard components logged::::",BaseService.baseMessages.messages);
  }   

  
}
