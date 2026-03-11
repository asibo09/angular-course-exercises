import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

type User = { id: number, name: string }
type Post = { id: number, title: string, userId: string }

const API = 'https://jsonplaceholder.typicode.com';

@Component({
  selector: 'app-root',
  imports: [JsonPipe, ReactiveFormsModule],
  template: `
  <div class="container my-3">
    <h1 class="text-center">API httpResource</h1>
    <div class="row">
      <div class="container col-6 my-3">
        <h2>Dati Post/User</h2>
        <button class="btn btn-info mb-3" (click)="nextUser()">Next</button>
          
        <pre>post: {{ post.value() | json }}</pre>
        <pre>user: {{ user.value() | json }}</pre>
        <pre>comments: {{ comments.value() | json }}</pre>
      </div>

      <div class="container col-6 my-3">
        <h2>Cerca Utenti:</h2>
        <input 
          type="text" [formControl]="inputReactive"
          placeholder="Search something (i.e. Bret)"
          class="form-control"
        >

        @if (users.error()) {
          <pre>Error!</pre>
        }
        @if (users.isLoading()) {
          <div>loading...</div>
        }

        @for(user of users.value(); track user.id) {
          <li>{{user.name}}</li>
        }
      </div>
    </div>
  </div>

  `,
})
export class App {
  postiId = signal(1)
  post = httpResource<Post>( () => `${API}/posts/${this.postiId()}`)
  user = httpResource<User[]>(() =>  `${API}/users/${this.post.value()?.userId}`)
  comments = httpResource<User>(() => `${API}/comments?postId=${this.post.value()?.userId}`)


  nextUser() {
    this.postiId.update(id => {
      return id < 100 ? id+5 : 1
    })
  }

  inputReactive = new FormControl();

  query = toSignal(
    this.inputReactive.valueChanges
      .pipe(
        // filter(text => text.length > 2),
        distinctUntilChanged(),
        debounceTime(1000)
      )
  )

  users = httpResource<User[]>(
    () => {
      const query = this.query()
      return query ? `https://jsonplaceholder.typicode.com/users?q=${query}`: undefined
    }
  )
}