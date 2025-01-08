import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  selector: "app-root",
  template: `<main>
    <header class="brand-name">
      <img src="assets/logo.svg" alt="logo" alt="logo" aria-hidden="true" />
    </header>
    <section class="content">
      <router-outlet />
    </section>
  </main>`,
  styleUrls: ["./app.component.css"],
  imports: [RouterModule],
})
export class AppComponent {
  title = "homes";
}
