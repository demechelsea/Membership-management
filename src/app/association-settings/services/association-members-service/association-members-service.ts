import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { PageModel } from 'app/models/page-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';
import { AssociationMemberDTO } from 'app/models/AssociationMemberDTO ';
import { FileDTO } from 'app/models/FileDTO';

@Injectable({
  providedIn: 'root'
})
export class AssociationMembersService extends HttpAppDataService {

  private http: HttpClient;
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getAssociationMembers(page: PageModel): Observable<ResultViewModel> {
    let associationMemberModel = new AssociationMemberDTO();
    let requestData = {
      associationMemberDTO: associationMemberModel,
      pageDTO: page
    };
    return this.postData(Urls.RETRIEVE_MEMBERS_BY_ASSOCIATION, requestData);
  }

  createAssociationMember(assoc: FormData): Observable<any> {
    return this.postData(Urls.REGISTER_ASSOCIATION_MEMBER, assoc);
  }
  
  updateAssociationMember(assoc: FormData): Observable<any> {
    return this.postData(Urls.UPDATE_ASSOCIATION_MEMBER, assoc);
  }

  downloadImage(assoc: AssociationMemberDTO): Observable<any>{
    let fileDto= new FileDTO();
    fileDto.docLink = assoc.photoLink
    return this.postData(Urls.GET_ASSOCIATION_MEMBER_PHOTO_BY_LINK, fileDto, 'blob');
  }

}
