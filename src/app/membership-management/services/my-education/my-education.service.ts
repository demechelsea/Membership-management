import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';
import { UserRelationShipDTO } from 'app/models/UserRelationShipDTO';
import { UserDetailDTO } from 'app/models/UserDetailDTO';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class MyEducationService extends HttpAppDataService {

  private http: HttpClient;
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getEducationHistory(id: number): Observable<ResultViewModel> {
    let userDetail = new UserDetailDTO();
    userDetail.id = id;            
    return this.postData(Urls.RETRIEVE_USER_EDUCATIONS_BY_USER_ID, userDetail);
  }

  createEducationHistory(education: UserDetailDTO): Observable<any> {
    return this.postData(Urls.REGISTER_USER_EDUCATION, education);
  }
  
  updateEducationHistory(education: UserDetailDTO): Observable<any> {
    return this.postData(Urls.UPDATE_USER_EDUCATION, education);
  }

  deleteEducationHistory(educationModel: UserDetailDTO): Observable<any> {
    return this.postData(Urls.DELETE_USER_EDUCATION, educationModel);
  }

}


