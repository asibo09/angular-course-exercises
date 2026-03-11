import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  template: ` 
    <div class="my-4">
      <button class="btn btn-primary" routerLink="counter">Counter</button>
      <button class="btn btn-secondary" routerLink="shop">Shop</button>
      <button class="btn btn-info" routerLink="cart">Cart</button>
    </div>
  `,
  styles: ``,
})
export class NavBar {}
