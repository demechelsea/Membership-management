import {AfterViewInit, Component, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-autocomplete-place',
  templateUrl: './autocomplete-place.component.html',
  styleUrls: ['./autocomplete-place.component.scss'],
})
export class AutocompletePlaceComponent  implements AfterViewInit{
    @Output() setAddress: EventEmitter<any> = new EventEmitter();
    @ViewChild('addresstext') addresstext: any;

    autocompleteInput: string;

    constructor() {
    }


    ngAfterViewInit() {
        this.getPlaceAutocomplete();
    }

    private getPlaceAutocomplete() {
        // @ts-ignore
        const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
            {
                componentRestrictions: { country: 'IN' },
                types: ['establishment']
            });
        // @ts-ignore
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            this.invokeEvent(place);
        });
    }

    invokeEvent(place: Object) {
        this.setAddress.emit(place);
    }

    onInputChanged() {
        this.setAddress.emit();
    }
}
