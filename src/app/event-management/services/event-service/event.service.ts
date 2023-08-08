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

@Injectable({
    providedIn: 'root'
})
export class EventService extends HttpAppDataService {

    private http: HttpClient;

    constructor(httpClient: HttpClient) {
        super(httpClient);
        this.http = httpClient;
    }

    getActiveEvents(): Observable<ResultViewModel> {
        return this.fetchData(Urls.ACTIVE_EVENT_LIST);
    }

    addEvent(eventDto: EventDTO): Observable<any> {
        return this.postData(Urls.EVENTS, eventDto);
    }

    getEventById(id: number): Observable<any> {
        return this.fetchData(Urls.EVENTS + '/' + id);
    }

    getEventTicketsById(id: number): Observable<any> {
        return this.fetchData(Urls.EVENTS + '/' + id + '/tickets');
    }

    addEventTicket(id: number, eventTicketDto: EventTicketDTO): Observable<any> {
        return this.postData(Urls.EVENTS + '/' + id + '/tickets', eventTicketDto);
    }

    editEventTicket(eventId: number, ticketId: number, eventTicketDto: EventTicketDTO): Observable<any> {
        return this.putData(Urls.EVENTS + '/' + eventId + '/tickets/' + ticketId, eventTicketDto);
    }

    getEventTicketsIssuedByEventId(id: number): Observable<any> {
        return this.fetchData(Urls.EVENTS + '/' + id + '/tickets-issues');
    }

    addEventTicketIssue(id: number, eventTicketIssueDto: EventTicketIssuedDTO): Observable<any> {
        return this.postData(Urls.EVENTS + '/' + id + '/tickets-issues', eventTicketIssueDto);
    }

    editEventTicketIssue(id: number, ticketIssueId:number, eventTicketIssueDto: EventTicketIssuedDTO): Observable<any> {
        return this.putData(Urls.EVENTS + '/' + id + '/tickets-issues/' + ticketIssueId, eventTicketIssueDto);
    }

    getEventSponsorsByEventId(id: number): Observable<any> {
        return this.fetchData(Urls.EVENTS + '/' + id + '/sponsors');
    }

    addEventSponsor(id: number, eventSponsorDTO: EventSponsorDTO): Observable<any> {
        return this.postData(Urls.EVENTS + '/' + id + '/sponsors', eventSponsorDTO);
    }

    editEventSponsor(id: number, ticketIssueId:number, eventSponsorDTO: EventSponsorDTO): Observable<any> {
        return this.putData(Urls.EVENTS + '/' + id + '/sponsors/' + ticketIssueId, eventSponsorDTO);
    }

}
