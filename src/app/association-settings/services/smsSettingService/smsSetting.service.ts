import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { AssociationDTO } from 'app/models/AssociationDTO';
import { MessageSettingDTO } from 'app/models/messageSettingDTO';
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

  getSmsSetting(): Observable<ResultViewModel> {
    let smsSettingModel = new AssociationDTO();
    return this.postData(Urls.MSG_SETTINGS_BY_ASSOC, smsSettingModel);
  }

  updateSmsSetting(id:number, smsModel: MessageSettingDTO): Observable<any> {
    let emailSettingModel = new MessageSettingDTO();
    emailSettingModel.id = id;
    return this.postData(Urls.MSG_SETTINGS_UPDATE, smsModel);
  }
}
