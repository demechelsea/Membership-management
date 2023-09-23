import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { Urls } from 'app/common/utils/urls';
import { Observable } from 'rxjs';
import { UserProfileSettingDTO } from 'app/models/UserProfileSettingDTO';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService extends HttpAppDataService {

  private http: HttpClient;
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  
  updateUserProfile(userProfile: UserProfileSettingDTO): Observable<any> {
    return this.postData(Urls.UPDATE_USER_PROFILE, userProfile);
  }


}
