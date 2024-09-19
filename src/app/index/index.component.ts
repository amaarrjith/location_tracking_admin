import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  locationArray: any = {};
  locationAllArray: any[] = [];
  deletemessage: any;
  deleteonemessage: any;
  mapUrl: SafeResourceUrl | null = null; // Initialize with null

  constructor(private services: ServicesService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.services.getLocation().subscribe((response: any) => {
      this.locationArray = response;
      console.log(this.locationArray);
      this.updateMapUrl(); // Update the map URL when location changes
    });

    this.services.getallLocation().subscribe((response: any) => {
      this.locationAllArray = response;
    });
  }

  updateMapUrl(): void {
    const lat = parseFloat(this.locationArray.latitude);
    const lon = parseFloat(this.locationArray.longitude);

    if (!isNaN(lat) && !isNaN(lon)) {
      const bbox = `${lon - 0.001},${lat - 0.001},${lon + 0.001},${lat + 0.001}`;
      const url = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      this.mapUrl = null; // Set to null if lat/long are not valid
    }
  }

  refresh() {
    location.reload();
  }

  deleteall() {
    this.services.deleteallLocations().subscribe((response: any) => {
      this.deletemessage = true;
    });
  }

  delete(id: any) {
    this.services.deleteMessages(id).subscribe((response: any) => {
      this.deleteonemessage = true;
    });
  }
}
