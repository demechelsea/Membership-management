import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { AssociationDocstoreDTO } from 'app/models/assocationAttachmmentDTO';
import { PageModel } from 'app/models/page-model';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssocationAttachmentService extends HttpAppDataService {

  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getAssocationAttachments(page: PageModel): Observable<ResultViewModel> {
    return this.postData(Urls.ASSOC_DOCSTORE_BY_ASSOCATION, page);
  }

  createAsscocationAttachment(plan: FormData): Observable<any> {
    return this.postData(Urls.REGISTER_ASSOC_DOCSTORE, plan);
  }

  updateAssocationAttachment( attachmentModel: AssociationDocstoreDTO): Observable<any> {
    return this.postData(Urls.UPDATE_ASSOC_DOCSTORE, attachmentModel);
  }

  deleteAssocationAttachment( attachmentModel: AssociationDocstoreDTO): Observable<any> {
    return this.postData(Urls.DELETE_ASSOC_DOCSTORE, attachmentModel);
  }
}
