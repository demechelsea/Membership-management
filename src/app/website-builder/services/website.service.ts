import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { ResultViewModel } from 'app/models/result-view-model';
import WebsiteInfoModel from 'app/models/website-info-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService extends HttpAppDataService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  retrieveWebsites(): Observable<ResultViewModel> {
    return this.postData(Urls.WEBSITE_INFO_LIST, {});
  }

  retrieveWebsiteById(encryptedId:string): Observable<ResultViewModel> {
   let websiteInfo:WebsiteInfoModel = new WebsiteInfoModel();
   websiteInfo.encryptedId = encryptedId;
    return this.postData(Urls.WEBSITE_INFO_LIST, websiteInfo);
  }

  saveWebSite(websiteInfoModel: WebsiteInfoModel): Observable<any> {
    return this.postData(Urls.SAVE_UPDATE_WEBSITE_INFO, websiteInfoModel);
  }

  updateStatus(id: number, websiteInfoModel: WebsiteInfoModel): Observable<any> {
    return this.postData(Urls.UPDATE_WEBSITE_INFO_STATUS, websiteInfoModel);
  }

}
