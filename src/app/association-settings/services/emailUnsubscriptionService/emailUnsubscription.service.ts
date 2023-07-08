import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { AssociationDTO } from 'app/models/AssociationDTO';
import { EmailSubscriptionDTO } from 'app/models/emailSubscriptionDTO';
import { PageModel } from 'app/models/page-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailUnsubscriptionService extends HttpAppDataService {

  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getEmailUnsubscribedList(page: PageModel): Observable<ResultViewModel> {
    let emailUnsubscribeListModel = new AssociationDTO();
    let requestData = {
      emailUnsubscribeListDTO: emailUnsubscribeListModel,
      pageDTO: page
    };
    return this.postData(Urls.EMAIL_UNSUBSCRIBED_ALL, requestData);
  }
  
  addEmailToUnsubscribedList(emailUnsubscribeListModel: EmailSubscriptionDTO): Observable<any> {
    return this.postData(Urls.EMAIL_SUBSCRIPTION_REGISTER, emailUnsubscribeListModel);
  }

  deleteEmailUnsubscribedList( emailUnsubscribeListModel: EmailSubscriptionDTO): Observable<any> {
    return this.postData(Urls.EMAIL_SUBSCRIPTION_UPDATE, emailUnsubscribeListModel);
  }
}
