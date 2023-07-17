import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { CommitteePositionDTO } from 'app/models/committeePositionDTO';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';
import { AssociationDTO } from 'app/models/AssociationDTO';

@Injectable({
  providedIn: 'root'
})
export class PositionService extends HttpAppDataService {

  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getCommitteePositions(): Observable<ResultViewModel> {
    let assocationModel = new AssociationDTO();
    return this.fetchData(Urls.POSITION_LIST, assocationModel);
  }

  createPosition(committeePosition: CommitteePositionDTO): Observable<any> {
    return this.postData(Urls.POSITION_CREATE, committeePosition);
  }
  
  updatePosition(id: number, positionModel: CommitteePositionDTO): Observable<any> {
    positionModel.id = id;
    return this.postData(Urls.POSITION_UPDATE, positionModel);
  }

  deletePosition(positionModel: CommitteePositionDTO): Observable<any> {
    return this.postData(Urls.POSITION_DELETE, positionModel);
  }

}
