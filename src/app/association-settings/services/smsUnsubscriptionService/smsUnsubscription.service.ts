import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { AssociationDTO } from 'app/models/AssociationDTO';
import { MessageSubscriptionDTO } from 'app/models/MessageSubscriptionDTO';
import { PageModel } from 'app/models/page-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SMSUnsubscriptionService extends HttpAppDataService {

  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getSmsUnsubscribedList(page: PageModel): Observable<ResultViewModel> {
    let smsUnsubscribeListModel = new AssociationDTO();
    let requestData = {
      smsUnsubscribeListDTO: smsUnsubscribeListModel,
      pageDTO: page
    };
    return this.postData(Urls.MSG_UNSUBSCRIBED_ALL, requestData);
  }
  
  addSmsToUnsubscribedList(smsUnsubscribeListModel: MessageSubscriptionDTO): Observable<any> {
    return this.postData(Urls.MSG_SUBSCRIPTION_REGISTER, smsUnsubscribeListModel);
  }

  deleteSmsUnsubscribedList( smsUnsubscribeListModel: MessageSubscriptionDTO): Observable<any> {
    return this.postData(Urls.MSG_SUBSCRIPTION_UPDATE, smsUnsubscribeListModel);
  }
}
