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
import CompanyDTO from "../../../models/event/CompanyDTO";

@Injectable({
    providedIn: 'root'
})
export class CompanyService extends HttpAppDataService {

    private http: HttpClient;

    constructor(httpClient: HttpClient) {
        super(httpClient);
        this.http = httpClient;
    }

    getCompanies(): Observable<ResultViewModel> {
        return this.fetchData(Urls.COMPANIES);
    }

    addCompany(companyDto: CompanyDTO): Observable<any> {
        return this.postData(Urls.COMPANIES, companyDto);
    }

}
