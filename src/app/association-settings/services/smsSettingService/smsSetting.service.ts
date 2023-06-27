import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { AssociationDTO } from 'app/models/AssociationDTO';
import { MessageSettingDTO } from 'app/models/messageSettingDTO';
import { PageModel } from 'app/models/page-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmsSettingService extends HttpAppDataService {

  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getSmsSetting(page: PageModel): Observable<ResultViewModel> {
    let smsModel = new AssociationDTO();
    if (page != null) {
      smsModel.page = page;
    }
    return this.postData(Urls.MSG_SETTINGS_BY_ASSOC, smsModel);
  }

  createEmails(smsModel: MessageSettingDTO): Observable<MessageSettingDTO> {
    return this.postData(Urls.MSG_SETTINGS_REGISTER, smsModel);
  }

  updateEmails(smsModel: MessageSettingDTO): Observable<MessageSettingDTO> {
    return this.postData(Urls.MSG_SETTINGS_UPDATE, smsModel);
  }
}
