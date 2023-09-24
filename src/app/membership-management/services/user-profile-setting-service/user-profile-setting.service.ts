import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpAppDataService } from "app/common/services/http-app-data.service";
import { Urls } from "app/common/utils/urls";
import { Observable, Subject } from "rxjs";
import { UserDetailDTO } from "app/models/UserDetailDTO";
import { UserProfileSettingDTO } from "app/models/UserProfileSettingDTO";
import { FileDTO } from "app/models/FileDTO";

@Injectable({
  providedIn: "root",
})
export class UserProfileSettingService extends HttpAppDataService {
  private http: HttpClient;
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.http = httpClient;
  }

  updateUserProfileSetting(
    userProfileSetting: UserProfileSettingDTO
  ): Observable<any> {
    return this.postData(Urls.UPDATE_USER_PROFILE_SETTING, userProfileSetting);
  }

  getUserProfileSetting(userdetail: UserDetailDTO): Observable<any> {
    return this.postData(
      Urls.RETRIEVE_USER_PROFILE_SETTING_BY_USER_ID,
      userdetail
    );
  }

  downloadImage(userProfileSetting: UserProfileSettingDTO): Observable<any>{
    let fileDto= new FileDTO();
    fileDto.docLink = userProfileSetting.photoLink
    return this.postData(Urls.GET_DOCSTORE_BY_LINK, fileDto, 'blob');
  }
}
