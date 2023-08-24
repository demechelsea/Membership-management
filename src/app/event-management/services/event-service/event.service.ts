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
        return this.postData(Urls.ADD_EVENTS, eventDto);
    }

    getEventById(id: string): Observable<any> {
        const eventDto: EventDTO = new EventDTO();
        eventDto.encryptedId = id;
        return this.postData(Urls.GET_EVENT_BY_ID, eventDto);
    }

    getEventTicketsById(id: string): Observable<any> {
        const eventTicketDto: EventTicketDTO = new EventTicketDTO();
        eventTicketDto.encryptedEventId = id;
        return this.postData(Urls.GET_EVENT_TICKETS, eventTicketDto);
    }

    addEventTicket(id: number, eventTicketDto: EventTicketDTO): Observable<any> {
        return this.postData(Urls.EVENTS + '/' + id + '/tickets', eventTicketDto);
    }

    editEventTicket(eventId: number, ticketId: number, eventTicketDto: EventTicketDTO): Observable<any> {
        return this.putData(Urls.EVENTS + '/' + eventId + '/tickets/' + ticketId, eventTicketDto);
    }

    getEventTicketsIssuedByEventId(id: string): Observable<any> {
        const eventTicketIssueDto: EventTicketIssuedDTO = new EventTicketIssuedDTO();
        eventTicketIssueDto.encryptedEventId = id;
        return this.postData(Urls.GET_EVENT_TICKET_ISSUED, eventTicketIssueDto);
    }

    addEventTicketIssue(eventTicketIssueDto: EventTicketIssuedDTO): Observable<any> {
        return this.postData(Urls.ADD_EVENT_TICKET_ISSUED, eventTicketIssueDto);
    }

    editEventTicketIssue(eventTicketIssueDto: EventTicketIssuedDTO): Observable<any> {
        return this.putData(Urls.EDIT_EVENT_TICKET_ISSUED, eventTicketIssueDto);
    }

    getEventSponsorsByEventId(id: string): Observable<any> {
        const eventSponsorDTO: EventSponsorDTO = new EventSponsorDTO();
        eventSponsorDTO.encryptedEventId = id;
        return this.postData(Urls.GET_EVENT_SPONSORS, eventSponsorDTO);
    }

    addEventSponsor(eventSponsorDTO: EventSponsorDTO): Observable<any> {
        return this.postData(Urls.ADD_EVENT_SPONSOR, eventSponsorDTO);
    }

    editEventSponsor(eventSponsorDTO: EventSponsorDTO): Observable<any> {
        return this.putData(Urls.EDIT_EVENT_SPONSOR, eventSponsorDTO);
    }

    getEventProgramsByEventId(id: string): Observable<any> {

        const eventProgrammeDTO: EventProgramDTO = new EventProgramDTO();
        eventProgrammeDTO.encryptedEventId = id;
        return this.postData(Urls.GET_EVENT_PROGRAMMES, eventProgrammeDTO );
    }

    addEventProgram(eventProgramDto: EventProgramDTO): Observable<any> {
        return this.postData(Urls.ADD_EVENT_PROGRAMME, eventProgramDto);
    }

    editEventProgram(eventProgramDto: EventProgramDTO): Observable<any> {
        return this.putData(Urls.EDIT_EVENT_PROGRAMME, eventProgramDto);
    }

    getGalleryByEventId(id: string): Observable<any> {

        const eventGalleryDTO: EventGalleryDTO = new EventGalleryDTO();
        eventGalleryDTO.encryptedEventId = id;
        return this.postData(Urls.GET_EVENT_GALLERY, eventGalleryDTO);
    }

    addEventGallery(eventGalleryDto: FormData): Observable<any> {
        return this.postData(Urls.ADD_EVENT_GALLERY, eventGalleryDto);
    }

    deleteGalleryByEventId(id: string, galleryId: string): Observable<any> {
        const eventGalleryDTO: EventGalleryDTO = new EventGalleryDTO();
        eventGalleryDTO.encryptedEventId = id;
        eventGalleryDTO.encryptedId = galleryId;
        return this.postData(Urls.DELETE_EVENT_GALLERY, eventGalleryDTO);
    }

}
