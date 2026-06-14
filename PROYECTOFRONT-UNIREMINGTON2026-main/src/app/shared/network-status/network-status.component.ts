import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-network-status',
  standalone: true,
  templateUrl: './network-status.component.html',
  styleUrls: ['./network-status.component.scss']
})
export class NetworkStatusComponent {
  isOnline: boolean = navigator.onLine;

  @HostListener('window:online')
  onOnline(): void {
    this.isOnline = true;
  }

  @HostListener('window:offline')
  onOffline(): void {
    this.isOnline = false;
  }
}
