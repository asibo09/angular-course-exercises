import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from "./core/components/nav-bar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar],
  template: `
    <div class="container">
      <app-nav-bar/>
      <router-outlet />
    </div>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('angular-multi-view');
}
