import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class opencommitteeMemberPopupService {
  private openCommitteeMemberPopupSource = new Subject<void>();
  openCommitteeMemberPopup$ = this.openCommitteeMemberPopupSource.asObservable();

  openCommitteeMemberPopup() {
    this.openCommitteeMemberPopupSource.next();
  }
}
