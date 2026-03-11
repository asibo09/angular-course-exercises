import { Component, computed, signal, inject, OnInit } from '@angular/core';
import { NgClass, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../model/todo';

const BASE_API = 'https://json-server-vercel-for-tutorials.vercel.app';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, JsonPipe],
  template: `
      @if (error()) {
        <div class="alert alert-error">
          error!
        </div>
      }
      <div>
        {{totalCompleted()}} completed | {{ totalTodos() }} todos
      </div>

      <input
        type="text"
        class="input input-bordered my-3 w-full"
        #inputRef
        (keydown.enter)="addTodo(inputRef)"
        placeholder="add todo and press Enter"
      >

      <ul>
        @for (todo of todos(); track todo.id) {
          <li class="flex justify-between">
            <div class="flex gap-3">
              <input
                type="checkbox" [checked]="todo.completed"
                (change)="toggleTodo(todo)"
              >
              <span [ngClass]="{'line-through': todo.completed}">
                  {{todo.title}}
              </span>
            </div>
            <button (click)="removeTodo(todo)">❌</button>
          </li>
        } @empty {
          <div>No todos. Add the first one</div>
        }
      </ul>

      <pre class="my-6">{{todos() | json}}</pre>
  `,
})
export class App implements OnInit {
  http = inject(HttpClient);
  todos = signal<Todo[]>([]);
  error = signal(false);

  totalCompleted = computed(
    () => this.todos().filter((t) => t.completed).length
  );

  totalTodos = computed(() => this.todos().filter((t) => !t.completed).length);

  ngOnInit() {
    this.http.get<Todo[]>(`${BASE_API}/todos`).subscribe({
      next: (res) => {
        this.todos.set(res);
      },
      error: (err) => {
        console.log('here', err);
        this.error.set(true);
      },
    });
  }

  addTodo(input: HTMLInputElement) {
    this.error.set(false);
    this.http
      .post<Todo>(`${BASE_API}/todos`, {
        title: input.value,
        completed: false,
      })
      .subscribe({
        next: (newTodo) => {
          this.todos.update((todos) => [...todos, newTodo]);
          input.value = '';
        },
        error: () => {
          this.error.set(true);
        },
      });
  }

  removeTodo(todoToRemove: Todo) {
    this.error.set(false);
    this.http.delete(`${BASE_API}/todos/${todoToRemove.id}`).subscribe({
      next: () => {
        this.todos.update((todos) =>
          todos.filter((todo) => todo.id !== todoToRemove.id)
        );
      },
      error: () => {
        this.error.set(true);
      },
    });
  }

  toggleTodo(todoToToggle: Todo) {
    this.error.set(false);
    this.http
      .patch<Todo>(`${BASE_API}/todos/${todoToToggle.id}`, {
        completed: !todoToToggle.completed,
      })
      .subscribe({
        next: (res) => {
          this.todos.update((todos) => {
            return todos.map((t) => (t.id === todoToToggle.id ? res : t));
          });
        },
        error: () => {
          this.error.set(true);
        },
      });
  }
}
