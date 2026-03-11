import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, minLength, required, validate, validateHttp } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [JsonPipe, FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="container row mt-2">
    <h1 class="text-center">Hello Signal Forms</h1>
    <div class="my-3 container col-auto">
      <div class="form-control mb-3">
        <input class="my2-2" type="text" placeholder="Your Name" [formField]="form.yourName" />
        <input class="my-2" type="email" placeholder="Email" [formField]="form.email" />
      </div>
      <button class="btn btn-primary" [disabled]="form().invalid()">SUBMIT</button>
      
      <hr>
      <h2 class="fw-bold text-danger">Errors:</h2>
      @for (error of form.yourName().errors(); track $index) {
        <li class="text-danger">{{error.message}}</li>
      }
      @for (error of form.email().errors(); track $index) {
        <li class="text-danger">{{error.message}}</li>
      }

      <hr>
      <pre class="">YourName Dirty: {{ form.yourName().dirty() | json}}</pre>
      <pre>YourName Touched: {{ form.yourName().touched() | json}}</pre>
      <hr>

      <pre class="">Email Dirty: {{ form.email().dirty() | json}}</pre>
      <pre>Email Touched: {{ form.email().touched() | json}}</pre>
      <hr>

      <pre class="">Form Dirty: {{ form().dirty() | json}}</pre>
      <pre>Form Touched: {{ form().touched() | json}}</pre>
      
      <hr>
      <pre class="">YourName errors: {{ form.yourName().errors()| json}}</pre>
      <pre class="">Email errors: {{ form.email().errors()| json}}</pre>

      <hr>
      <pre class="mt-3">Form Valid: {{ form().valid() | json}}</pre>
      <pre class="mt-3">Form Value: {{ form().value() | json}}</pre>
      <pre>Signal Value: {{data() | json}}</pre>
    </div>
    <div class="container my-3 col-auto">
      <input class="form-control" [formField]="formSearch.text" placeholder="Search in List" />
      <hr>
      <pre>Result: {{list.value() | json}}</pre>
    </div>
  </div>
  
  `,
})
export class App {
  protected readonly data = signal({ yourName: '', email: '' });
  protected readonly form = form(this.data, (p) => {
    required(p.yourName, { message: 'Name is required'});
    required(p.email, { message: 'Email is required'});
    minLength(p.yourName, 3, {message: 'Too short'});

  });

  
  protected readonly search = signal( { text: ''})
  protected readonly formSearch = form(this.search)


  textDebounced = toSignal(
  toObservable(this.formSearch.text().value).pipe(
    debounceTime(1000)
  ) 
  )
  list = httpResource(() => `http://jsonplaceholder.typicode.com/users?q=${this.textDebounced()}`)

  constructor() {
    setTimeout(() => {
      this.data.set({ yourName: 'Pietro', email: 'pietro@email.com'})
    }, 5000);
    setTimeout(() => {
      this.form().value.set({ yourName: 'Another', email: 'another@email.com'})
    }, 10000);
  }
  
}
