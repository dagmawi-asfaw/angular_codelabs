import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HousingService } from "../housing.service";
import { HousingLocation } from "../housing-location";
import {
  EmailValidator,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import { last } from "rxjs";
@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
        width="300"
        height="200"
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
        <section class="listing-features">
          <h2 class="section-heading">About this location</h2>
          <ul>
            <li>Units Available: {{ housingLocation?.availableUnits }}</li>
            <li>Does it have wifi? {{ housingLocation?.wifi }}</li>
            <li>Does it have laundry? {{ housingLocation?.laundry }}</li>
          </ul>
        </section>
        <section class="listing-apply">
          <h2 class="section-heading">Apply now to live here.</h2>
          <form [formGroup]="applyForm" (submit)="submitApplication()" )>
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" formControlName="firstName" />
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" formControlName="lastName" />
            <label for="email">Email</label>
            <input type="email" id="email" formControlName="email" />
            <button class="primary" type="submit">Apply</button>
          </form>
        </section>
      </section>
    </article>
  `,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm: FormGroup = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? ""
    );
  }
  constructor() {
    const housingLocationId = Number(this.route.snapshot.params["id"]);
    this.housingLocation =
      this.housingService.getLocationById(housingLocationId);
  }
}
