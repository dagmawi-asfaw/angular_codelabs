import { Injectable } from "@angular/core";
import { HousingLocation } from "./housing-location";

@Injectable({
  providedIn: "root",
})
export class HousingService {
  protected url = "http://localhost:3000/locations";

  protected Locations: HousingLocation[] = [];

  async getAllLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    const locations = await data.json();
    return locations ?? [];
  }

  async getLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    const location = await data.json();
    return location ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Application submitted for ${firstName} ${lastName} at ${email}`
    );
  }

  constructor() {
    this.getAllLocations().then((locations) => {
      this.Locations = locations;
    });
  }
}
