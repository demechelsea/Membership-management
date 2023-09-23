import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { PageModel } from 'app/models/page-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable, Subject } from 'rxjs';
import { UserRelationShipDTO } from 'app/models/UserRelationShipDTO';
import { FileDTO } from 'app/models/FileDTO';
import { UserDetailDTO } from 'app/models/UserDetailDTO';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class MyfamilyService extends HttpAppDataService {

  private http: HttpClient;
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getFamilyMembers(id: number): Observable<ResultViewModel> {
    let userDetail = new UserDetailDTO();
    userDetail.id = id;        
    return this.postData(Urls.RETRIEVE_FAMILY_MEMBERS_BY_USER_ID, userDetail);
  }

  createFamilyMember(family: FormData): Observable<any> {
    return this.postData(Urls.REGISTER_FAMILY_MEMBER, family);
  }
  
  updateFamilyMember(family: FormData): Observable<any> {
    return this.postData(Urls.UPDATE_FAMILY_MEMBER, family);
  }

  deleteFamilyMember(familymodel: UserRelationShipDTO): Observable<any> {
    return this.postData(Urls.DELETE_FAMILY_MEMBER, familymodel);
  }

  downloadImage(familyRelationship: UserRelationShipDTO): Observable<any>{
    return this.postData(Urls.GET_DOCSTORE_BY_LINK, familyRelationship, 'blob');
  }

}
