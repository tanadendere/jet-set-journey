import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  breakpointPrefix: string = '';

  constructor() {
    this.breakpointPrefix = this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    const screenSize = window.innerWidth;
    switch (true) {
      case screenSize > 1536:
        return '2xl';
      case screenSize > 1280:
        return 'xl';
      case screenSize > 1024:
        return 'lg';
      case screenSize > 768:
        return 'md';
      default:
        return 'sm';
    }
  }
}
