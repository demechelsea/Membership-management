import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { AssociationDTO } from 'app/models/AssociationDTO';
import { EmailTemplateDTO } from 'app/models/emailTemplateDTO';
import { PageModel } from 'app/models/page-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService extends HttpAppDataService {

  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getEmailTemplates(page: PageModel): Observable<ResultViewModel> {
    let emailTemplateModel = new AssociationDTO();
    let requestData = {
      emailTemplateDTO: emailTemplateModel,
      pageDTO: page
    };
    return this.postData(Urls.EMAIL_TEMPLATE_BY_ASSOC, requestData);
  }

  createEmailTemplates(emailTemplateModel: EmailTemplateDTO): Observable<EmailTemplateDTO> {
    return this.postData(Urls.EMAIL_TEMPLATE_REGISTER, emailTemplateModel);
  }

  updateEmailTemplates(emailTemplateModel: EmailTemplateDTO): Observable<any> {
    return this.postData(Urls.EMAIL_TEMPLATE_UPDATE, emailTemplateModel);
  }

  deleteEmailTemplates(emailTemplateModel: EmailTemplateDTO): Observable<EmailTemplateDTO> {
    return this.postData(Urls.EMAIL_TEMPLATE_DELETE, emailTemplateModel);
  }
}
