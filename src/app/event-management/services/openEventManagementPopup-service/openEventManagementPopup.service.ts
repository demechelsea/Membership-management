import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class openEventManagementPopupService {
  private openEventManagementPopupSource = new Subject<void>();
  openEventManagementPopup$ = this.openEventManagementPopupSource.asObservable();

  openEventManagementPopup() {
    this.openEventManagementPopupSource.next();
  }
}
