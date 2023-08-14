import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpAppDataService} from 'app/common/services/http-app-data.service';
import {Urls} from 'app/common/utils/urls';
import committeeDTO from 'app/models/committeeDTO';
import {ResultViewModel} from 'app/models/result-view-model';
import {Observable} from 'rxjs';
import EventDTO from "../../../models/event/eventDTO";
import EventTicketDTO from "../../../models/event/eventTicketDTO";
import EventTicketIssuedDTO from "../../../models/event/eventTicketIssuedDTO";
import EventSponsorDTO from "../../../models/event/eventSponsorDTO";
import EventProgramDTO from "../../../models/event/eventProgramDTO";
import CouponDTO from "../../../models/CouponDTO";

@Injectable({
    providedIn: 'root'
})
export class CouponService extends HttpAppDataService {

    private http: HttpClient;

    constructor(httpClient: HttpClient) {
        super(httpClient);
        this.http = httpClient;
    }

    getCoupons(): Observable<ResultViewModel> {
        return this.fetchData(Urls.COUPONS);
    }

    addCoupon(couponDTO: CouponDTO): Observable<any> {
        return this.postData(Urls.COUPONS, couponDTO);
    }

    editCoupon(couponId: number, couponDTO: CouponDTO): Observable<any> {
        return this.putData(Urls.COUPONS + '/' + couponId, couponDTO);
    }
}
