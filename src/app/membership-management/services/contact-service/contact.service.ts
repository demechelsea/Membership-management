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
export class ContactService extends HttpAppDataService {

  private http: HttpClient;
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getContacts(id: number): Observable<ResultViewModel> {
    let userDetail = new UserDetailDTO();
    userDetail.id = id;        
    return this.postData(Urls.RETRIEVE_USER_CONTACT_BY_USER_ID, userDetail);
  }

  createContact(workExperience: UserDetailDTO): Observable<any> {
    return this.postData(Urls.REGISTER_USER_CONTACT, workExperience);
  }
  
  updateContacte(workExperience: UserDetailDTO): Observable<any> {
    return this.postData(Urls.UPDATE_USER_CONTACT, workExperience);
  }

  deleteContact(workExperience: UserDetailDTO): Observable<any> {
    return this.postData(Urls.DELETE_USER_CONTACT, workExperience);
  }

}


