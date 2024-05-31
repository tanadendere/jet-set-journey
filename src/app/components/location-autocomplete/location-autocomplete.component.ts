import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { IPlaceSearchResult } from '../../models/placesAPI';

@Component({
  selector: 'app-location-autocomplete',
  standalone: true,
  imports: [],
  templateUrl: './location-autocomplete.component.html',
  styleUrl: './location-autocomplete.component.scss',
})
export class LocationAutocompleteComponent {
  @ViewChild('inputField')
  inputField!: ElementRef;

  @Input() placeholder = '';
  @Output() placeChanged = new EventEmitter<IPlaceSearchResult>();

  autocomplete: google.maps.places.Autocomplete | undefined;
  ngZone: NgZone = inject(NgZone);

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputField.nativeElement
    );

    this.autocomplete?.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.autocomplete?.getPlace();
        const result: IPlaceSearchResult = {
          address: this.inputField.nativeElement.value,
          name: place?.name,
          location: place?.geometry?.location,
          imageUrl: this.getPhotoUrl(place),
          iconUrl: place?.icon,
        };

        this.placeChanged.emit(result);
      });
    });
  }

  getPhotoUrl(
    place: google.maps.places.PlaceResult | undefined
  ): string | undefined {
    return place?.photos && place?.photos.length > 0
      ? place?.photos[0].getUrl({ maxWidth: 500 })
      : undefined;
  }
}
