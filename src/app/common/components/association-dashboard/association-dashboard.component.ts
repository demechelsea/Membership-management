import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'app/auth/service/login.service';
import { BaseService } from 'app/common/services/base.service';
import { BaseComponent } from 'app/core/components/base/base.component';

@Component({
  selector: 'sorax-association-dashboard',
  templateUrl: './association-dashboard.component.html',
  styleUrls: ['./association-dashboard.component.scss']
})
export class AssociationDashboardComponent extends BaseComponent implements OnInit {

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
