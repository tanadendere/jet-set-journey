import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  // src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleAPI}&loading=async&libraries=places&&callback=initMap`;
  src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleAPI}&loading=async&libraries=places&callback=initMap`;

  ngOnInit(): void {
    const loader = new Loader({
      apiKey: environment.googleAPI,
      version: 'quarterly',
      libraries: ['places'],
      language: 'en',
    });

    loader.importLibrary('places').then(async (url) => {
      // const script = document.createElement('script');
      // const googleAPIURL = `https://maps.googleapis.com/maps/api/js?key=${environment.googleAPI}&libraries=places&language=en`;
      // script.src = url.Autocomplete;
      // document.body.appendChild(script);
    });
  }
}
