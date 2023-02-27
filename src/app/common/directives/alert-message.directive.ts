import { Directive, ElementRef, Input, Inject, Injector,  NgZone, OnChanges, Renderer2 } from '@angular/core';
import { BaseService } from 'app/common/services/base.service';
import { NotificationService } from 'app/common/services/notification.service';
import { MessageWrapModel } from 'app/models/message-wrap-model';


@Directive({
  selector: '[soraxdir-alert-message]'
})
export class AlertMessageDirective implements OnChanges{

  @Input("errorMessage") errorMessage:  string;

  constructor(private _ngZone: NgZone,private elementRef: ElementRef, 
                    private baseService:BaseService
                  , private renderer2: Renderer2, @Inject(Injector) private injector: Injector) { }


  ngOnInit() {    
      //this.writeIntoTheDiv();
    }

  ngOnChanges(){
    this.writeIntoTheDiv();
  }
  private getNotificationService(): NotificationService {
    return this.injector.get(NotificationService);
  }

  private writeIntoTheDiv(){
    //clearing existing messages
    this.elementRef.nativeElement.innerHTML= '';
    

    let errors: boolean = false;
    let warns: boolean = false;
    let infos: boolean = false;
    let success: boolean = false;

    let errorMessageObj: MessageWrapModel= JSON.parse(this.errorMessage);
    
    if (errorMessageObj.messages != null && errorMessageObj.messages.length > 0) {
      let divElementError = this.renderer2.createElement("div");
      this.renderer2.setAttribute(divElementError, "role", "alert");
      this.renderer2.setAttribute(divElementError, "class", "alert alert-danger");
      this.renderer2.setStyle(divElementError, "transition", "transform 0.5s");


      let divElementWarn = this.renderer2.createElement("div");
      this.renderer2.setAttribute(divElementWarn, "role", "alert");
      this.renderer2.setAttribute(divElementWarn, "class", "alert alert-warning");
      this.renderer2.setStyle(divElementWarn, "transition", "transform 0.5s");


      let divElementInfo = this.renderer2.createElement("div");
      this.renderer2.setAttribute(divElementInfo, "role", "alert");
      this.renderer2.setAttribute(divElementInfo, "class", "alert alert-info");
      this.renderer2.setStyle(divElementInfo, "transition", "transform 0.5s");

      let divElementSuccess = this.renderer2.createElement("div");
      this.renderer2.setAttribute(divElementSuccess, "role", "alert");
      this.renderer2.setAttribute(divElementSuccess, "class", "alert alert-success");
      this.renderer2.setStyle(divElementSuccess, "transition", "transform 0.5s");
      
       ////<span class="message">messagetext</span>
       //let spanElement1 = this.renderer2.createElement("span");
      // this.renderer2.setAttribute(spanElement1, "class", "closebtn");
      // this.renderer2.setAttribute(spanElement1, "onclick", "this.parentElement.style.display='none';");
      // let spanText1 = this.renderer2.createText("X");
      // this.renderer2.appendChild(spanElement1, spanText1);
       //this.renderer2.appendChild(divElementError, spanElement1);


      //<div></div>  
      //<div role="alert"> </div>
      //<div role="alert" class="alert alert-danger fade show"> </div>      
      //<div role="alert" class="alert alert-danger fade show" style="transition: transform 0.5s"> </div>
      for (let i = 0; i < errorMessageObj.messages.length; i++) {
        let messageObj = errorMessageObj.messages[i];
        
       
        let spanElement = this.renderer2.createElement("span");
        this.renderer2.setAttribute(spanElement, "class", "message");
        let spanText = this.renderer2.createText(messageObj.message);
        this.renderer2.appendChild(spanElement, spanText);
        
        let brElement = this.renderer2.createElement('br')

        if (messageObj.type == "VALIDATION_ERROR"
             || messageObj.type == "BUSINESS_ERROR") {
          errors = true;
          this.renderer2.appendChild(divElementError, spanElement);
          this.renderer2.appendChild(divElementError, brElement);

          
        } else if (messageObj.type == "INFO") {
          infos = true;
          this.renderer2.appendChild(divElementInfo, spanElement);
          this.renderer2.appendChild(divElementInfo, brElement);
       

        } else if (messageObj.type == "WARNING") {
          warns = true;
          this.renderer2.appendChild(divElementWarn, spanElement);
          this.renderer2.appendChild(divElementWarn, brElement);        

        } else if (messageObj.type == "SUCCESS") {
          success = false;
         // this.renderer2.appendChild(divElementSuccess, spanElement);
         // this.renderer2.appendChild(divElementSuccess, brElement);
         this.getNotificationService().showMessage(messageObj);
         
        }
      }

      if(errors)
        this.elementRef.nativeElement.appendChild(divElementError);
      
      if(warns)
        this.elementRef.nativeElement.appendChild(divElementWarn);
     
      if(infos)
        this.elementRef.nativeElement.appendChild(divElementInfo);

      if(success)
          this.elementRef.nativeElement.appendChild(divElementSuccess);
    }    

      //once message is displayed remove those meesages outside   
      this.clearMessages();
  }
  /**
   * This method clears the message outside of defection process
   */
  clearMessages(){
    this._ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.baseService.clearBaseMessages();
      });
    });
    this.getNotificationService().closeloader();
  }

}
