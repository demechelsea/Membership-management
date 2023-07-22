import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { AssociationDTO } from 'app/models/AssociationDTO';
import { MessageTemplateDTO } from 'app/models/messageTemplateDTO';
import { PageModel } from 'app/models/page-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmsTemplateService extends HttpAppDataService {

  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getSmsTemplates(page: PageModel): Observable<ResultViewModel> {
    let smsTemplateModel = new AssociationDTO();
    let requestData = {
      smsTemplateDTO: smsTemplateModel,
      pageDTO: page
    };
    return this.postData(Urls.MSG_TEMPLATE_BY_ASSOC, requestData);
  }

  updateSmsTemplates(smsTemplateModel: MessageTemplateDTO): Observable<any> {
    return this.postData(Urls.MSG_TEMPLATE_UPDATE, smsTemplateModel);
  }

  deleteSmsTemplates(emailTemplateModel: MessageTemplateDTO): Observable<MessageTemplateDTO> {
    return this.postData(Urls.MSG_TEMPLATE_DELETE, emailTemplateModel);
  }
}
