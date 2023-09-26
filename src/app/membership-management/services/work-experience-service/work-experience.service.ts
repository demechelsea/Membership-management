import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';
import { UserDetailDTO } from 'app/models/UserDetailDTO';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService extends HttpAppDataService {

  private http: HttpClient;
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getWorkExperience(id: number): Observable<ResultViewModel> {
    let userDetail = new UserDetailDTO();
    userDetail.id = id;        
    return this.postData(Urls.RETRIEVE_WORK_EXPERIENCE_BY_USER_ID, userDetail);
  }

  createWorkExperience(workExperience: UserDetailDTO): Observable<any> {
    return this.postData(Urls.REGISTER_WORK_EXPERIENCE, workExperience);
  }
  
  updateWorkExperience(workExperience: UserDetailDTO): Observable<any> {
    return this.postData(Urls.UPDATE_WORK_EXPERIENCE, workExperience);
  }

  deleteWorkExperience(workExperience: UserDetailDTO): Observable<any> {
    return this.postData(Urls.DELETE_WORK_EXPERIENCE, workExperience);
  }

}


