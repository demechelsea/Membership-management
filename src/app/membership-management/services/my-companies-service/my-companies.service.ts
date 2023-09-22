import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable, Subject } from 'rxjs';
import { UserDetailDTO } from 'app/models/UserDetailDTO';
import { UserCompanyDTO } from 'app/models/UserCompanyDTO';

@Injectable({
  providedIn: 'root'
})
export class MycompanyService extends HttpAppDataService {

  private http: HttpClient;
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getCompanies(id: number): Observable<ResultViewModel> {
    let userDetail = new UserDetailDTO();
    userDetail.id = id;        
    return this.postData(Urls.RETRIEVE_USER_COMPANY_BY_USER_ID, userDetail);
  }

  createCompanies(companyModel: FormData): Observable<any> {
    return this.postData(Urls.REGISTER_USER_COMPANY, companyModel);
  }
  
  updateCompanies(companyModel: FormData): Observable<any> {
    return this.postData(Urls.UPDATE_USER_COMPANY, companyModel);
  }

  deleteCompanies(companyModel: UserCompanyDTO): Observable<any> {
    return this.postData(Urls.DELETE_USER_COMPANY, companyModel);
  }

  downloadImage(companyModel: UserCompanyDTO): Observable<any>{
    return this.postData(Urls.GET_DOCSTORE_BY_LINK, companyModel, 'blob');
  }

}
