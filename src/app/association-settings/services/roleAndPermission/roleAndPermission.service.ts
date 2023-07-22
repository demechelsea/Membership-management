import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { ResultViewModel } from 'app/models/result-view-model';
import { Observable } from 'rxjs';
import { UserDetailDTO } from 'app/models/UserDetailDTO';
import RoleDTO from 'app/models/roleDTO';
import PermissionDTO from 'app/models/permissionDTO';
import RoleAndPermissionDTO from 'app/models/roleAndPermissionDTO';

@Injectable({
  providedIn: 'root'
})
export class RoleAndPermissionService extends HttpAppDataService {

  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  getRoleAndPermission(id: number): Observable<ResultViewModel> {
    let roleAndPermissionModel = new UserDetailDTO();
    roleAndPermissionModel.id = id;
    return this.postData(Urls.GET_USER_ROLES_AND_PERMISSIONS, roleAndPermissionModel);
  }

  updateRoleAndPermission(userPermissionAndRole: RoleAndPermissionDTO): Observable<any> {
    return this.postData(Urls.UPDATE_USER_ROLES_AND_PERMISSIONS, userPermissionAndRole);
  }

}
