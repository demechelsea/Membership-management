import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { PageModel } from 'app/models/page-model';
import { CommitteePositionDTO } from 'app/models/committeePositionDTO';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService extends HttpAppDataService {

  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getCommitteePositions(page: PageModel, id: number): Observable<ResultViewModel> {
    let positionModel = new CommitteePositionDTO();
    positionModel.id = id;
    if (page != null) {
      positionModel.page = page;
    }
    return this.postData(Urls.POSITION_LIST, positionModel);
  }

  createPosition(positionModel: CommitteePositionDTO): Observable<any> {
    return this.postData(Urls.POSITION_CREATE, positionModel);
  }
  
  updatePosition(id: number, positionModel: CommitteePositionDTO): Observable<any> {
    positionModel.id = id;
    return this.postData(Urls.POSITION_UPDATE, positionModel);
  }

  deletePosition(positionModel: CommitteePositionDTO): Observable<any> {
    return this.postData(Urls.POSITION_DELETE, positionModel);
  }

}
