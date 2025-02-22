import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { FileDTO } from 'app/models/FileDTO';
import CommitteeDTO from 'app/models/committeeDTO';
import { CommitteeMemberDTO } from 'app/models/committeeMemberDTO';
import { PageModel } from 'app/models/page-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommitteeMemberService extends HttpAppDataService {

  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getCommitteeMembers(page: PageModel, id: number): Observable<ResultViewModel> {
    let committeeMemberModel = new CommitteeDTO();
    committeeMemberModel.id = id;
    let requestData = {
      committeeDTO: committeeMemberModel,
      pageDTO: page
    };
    return this.postData(Urls.COMMITTEE_MEMBER_LIST, requestData);
  }

  createCommitteeMember(plan: FormData): Observable<any> {
    return this.postData(Urls.REGISTER_COMMITTEE_MEMBER, plan);
  }

  updateCommitteeMember(plan: FormData): Observable<any> {
    return this.postData(Urls.UPDATE_COMMITTEE_MEMBER, plan);
  }

  downloadImage(attachmentModel: CommitteeMemberDTO): Observable<any>{
    let fileDto= new FileDTO();
    fileDto.docLink = attachmentModel.photoLink
    return this.postData(Urls.GET_DOCSTORE_BY_LINK, fileDto, 'blob');
  }
}
