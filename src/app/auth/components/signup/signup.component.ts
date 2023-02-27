import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'app/core/components/base/base.component';
import { UserViewModel } from 'app/models/user-view-model';
import { LoginService } from 'app/auth/service/login.service';

@Component({
  selector: 'sorax-signup',
  templateUrl:'./signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends BaseComponent implements OnInit, OnDestroy {

  subscription: Subscription ;
  signUpForm: FormGroup;

  employeModel: UserViewModel = new UserViewModel();
  
  constructor(private formBuilder: FormBuilder
                , private loginService: LoginService
                , private router:Router
                ,private route:ActivatedRoute){
               super();   

  }

  ngOnInit(){
    const password = new FormControl('', Validators.required);
    //const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
    const confirmPassword = new FormControl('', Validators.required);
    
   this.signUpForm = this.formBuilder.group({
      employee: this.formBuilder.group(
        {
          employeeDetail:this.formBuilder.group({
            firstName:this.formBuilder.control("",Validators.required),
            surName:this.formBuilder.control("",Validators.required)
          }), 
          organization: this.formBuilder.group({
            name: this.formBuilder.control("",Validators.required)
          }),
          emailId: this.formBuilder.control("",[Validators.required, Validators.email]),
          phone: this.formBuilder.control("",Validators.required),
          password: password, 
          confirmPassword:confirmPassword, 
          
        }),
        agreed: this.formBuilder.control(false, Validators.requiredTrue) });

      
  }


  submitForRegistration() {
      let employeModelReqModel = this.signUpForm.value.employee as UserViewModel;
    this.subscription = this.loginService.signupNewUser(employeModelReqModel).subscribe(
      (response) => {
          Object.assign(this.employeModel, response);
          //saving the messages
          Object.assign(this.messages, response);

          if(this.messages.isSuccess()){
             //this.employeModel.encryptedRefId
             this.router.navigate(['/auth/verifyUser', this.employeModel.encryptedRefId]);
          }
      });
  }

  ngOnDestroy()
  {    
    if(this.subscription!=null){
      this.subscription.unsubscribe();
    }        
  }
  

}
