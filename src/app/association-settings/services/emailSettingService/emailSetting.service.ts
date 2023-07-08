import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { AssociationDTO } from 'app/models/AssociationDTO';
import { EmailSettingDTO } from 'app/models/emailSettingDTO';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailSettingService extends HttpAppDataService {

  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getEmailSetting(): Observable<ResultViewModel> {
    let emailSettingModel = new AssociationDTO();
    return this.postData(Urls.EMAIL_SETTINGS_BY_ASSOC, emailSettingModel);
  }
  
  updateEmailSetting(id : number, emailModel: EmailSettingDTO): Observable<any> {
    let emailSettingModel = new EmailSettingDTO();
    emailSettingModel.id = id;
    return this.postData(Urls.EMAIL_SETTINGS_UPDATE, emailModel);
  }
}
