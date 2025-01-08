import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent, title: "Home Page" },
  { path: "details/:id", component: DetailsComponent, title: "Details Page" },
];

export default routes;
