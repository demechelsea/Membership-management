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
import EventGalleryDTO from "../../../models/event/eventGalleryDTO";

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

    getPastEvents(): Observable<ResultViewModel> {
        return this.fetchData(Urls.PAST_EVENT_LIST);
    }

    addEvent(eventDto: EventDTO): Observable<any> {
        return this.postData(Urls.EVENTS, eventDto);
    }

    getEventById(id: string): Observable<any> {
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

    getEventProgramsByEventId(id: number): Observable<any> {
        return this.fetchData(Urls.EVENTS + '/' + id + '/programmes');
    }

    addEventProgram(id: number, eventProgramDto: EventProgramDTO): Observable<any> {
        return this.postData(Urls.EVENTS + '/' + id + '/programmes', eventProgramDto);
    }

    editEventProgram(eventId: number, programId: number, eventProgramDto: EventProgramDTO): Observable<any> {
        return this.putData(Urls.EVENTS + '/' + eventId + '/programmes/' + programId, eventProgramDto);
    }

    getGalleryByEventId(id: number): Observable<any> {
        return this.fetchData(Urls.EVENTS + '/' + id + '/gallery');
    }

    addEventGallery(id: number, eventGalleryDto: FormData): Observable<any> {
        return this.postData(Urls.EVENTS + '/' + id + '/gallery', eventGalleryDto);
    }

    deleteGalleryByEventId(id: number, galleryId: number): Observable<any> {
        return this.deleteData(Urls.EVENTS + '/' + id + '/gallery/' + galleryId);
    }

}
