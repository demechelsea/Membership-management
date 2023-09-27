import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { AssociationModel } from 'app/models/association-model';
import { Observable, catchError, map, of } from 'rxjs';
import { Urls } from '../utils/urls';
import { HttpAppDataService } from './http-app-data.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService extends HttpAppDataService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }


  validateAssociationSubDomain(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const soceityRaxUrl = control.value;

      if (!soceityRaxUrl) {
        return of(null);
      }

      let associatioModel: AssociationModel = new AssociationModel();
      associatioModel.soceityRaxUrl = soceityRaxUrl;

      return this.postData(Urls.FETCH_ASSOC_BY_CONTEXTPATH, associatioModel).pipe(
        map((response) => {
         
          if (response['result']) {
           return  { subdomainAlreadyTaken: true }
          } 

          return null;
        }),
        catchError(() => of(null))
      );
    };
  }

  validateAssoicationPlaceName(associationName:string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const associationNameCtrl = control.root.get(associationName)?.value;
      const placeCtrl = control.value;

      if (!associationNameCtrl || !placeCtrl) {
        return of(null);
      }

      let associatioModel: AssociationModel = new AssociationModel();
      associatioModel.name = associationNameCtrl;
      associatioModel.place = placeCtrl;

      return this.postData(Urls.FETCH_ASSOC_BY_NAME_AND_PLACE, associatioModel).pipe(
        map((response) => {
         
          if (response['result']) {
           return  { associationNamePlaceUnique: true }
          } 

          return null;
        }),
        catchError(() => of(null))
      );
    };
  }

}
