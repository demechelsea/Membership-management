import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { AssociationDTO } from 'app/models/AssociationDTO';
import CommitteeDTO from 'app/models/committeeDTO';
import { CommitteeMemberAttachmentDTO } from 'app/models/committeeMemberAttachmmentDTO';
import { PageModel } from 'app/models/page-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService extends HttpAppDataService {

  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getAttachments(page: PageModel, id: number): Observable<ResultViewModel> {
    let committeeModel = new CommitteeDTO();
    committeeModel.id = id;
    if (page != null) {
      committeeModel.page = page;
    }
    return this.postData(Urls.COMMITTEE_DOCSTORE_BY_COMMITTEE, committeeModel);
  }

  createAttachment(plan: FormData): Observable<CommitteeMemberAttachmentDTO> {
    return this.postData(Urls.REGISTER_COMMITTEE_DOCSTORE, plan);
  }

  deleteAttachment( attachmentModel: CommitteeMemberAttachmentDTO): Observable<CommitteeMemberAttachmentDTO> {
    alert(attachmentModel.id)
    return this.postData(Urls.DELETE_COMMITTEE_DOCSTORE, attachmentModel);
  }
}
