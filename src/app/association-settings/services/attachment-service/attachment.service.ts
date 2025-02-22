import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { FileDTO } from 'app/models/FileDTO';
import CommitteeDTO from 'app/models/committeeDTO';
import { CommitteeDocstoreDTO } from 'app/models/committeeDocstoreDTO';
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
    let committeeAttachmentModel = new CommitteeDTO();
    committeeAttachmentModel.id = id;
    let requestData = {
      committeeDTO: committeeAttachmentModel,
      pageDTO: page
    };
    return this.postData(Urls.COMMITTEE_DOCSTORE_BY_COMMITTEE, requestData);
  }

  createAttachment(plan: FormData): Observable<any> {
    return this.postData(Urls.REGISTER_COMMITTEE_DOCSTORE, plan);
  }

  deleteAttachment( attachmentModel: CommitteeDocstoreDTO): Observable<any> {
    return this.postData(Urls.DELETE_COMMITTEE_DOCSTORE, attachmentModel);
  }

  downloadImage(fileModel: FileDTO): Observable<any>{

    return this.postData(Urls.GET_DOCSTORE_BY_LINK, fileModel, 'blob');
  }
  

}
