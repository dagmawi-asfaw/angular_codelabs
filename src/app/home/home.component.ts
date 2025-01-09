import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from "../housing-location";
import { HousingService } from "../housing.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section class="home">
      <form class="search">
        <input type="text" placeholder="Filter by city" #filter name="filter" />
        <button
          class="primary"
          type="button"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let location of filteredLocations"
        [housingLocation]="location"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  locations: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocations: HousingLocation[] = [];

  filterResults(filter: string) {
    if (filter === "") this.filteredLocations = this.locations;

    this.filteredLocations = this.locations.filter((location) =>
      location.city.toLowerCase().includes(filter.toLowerCase())
    );
  }

  constructor() {
    this.housingService.getAllLocations().then((locations) => {
      this.locations = locations;
      this.filteredLocations = locations;
    });
  }
}
