import { Component, input } from "@angular/core";

@Component({
    selector: 'app-card',
    template: `

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-6">
          <div class="card bg-base-100 w-full shadow-xl">
          @if (img()) {
          <figure>
              <img
                [src]="img()"
                [alt]="title()" />
            </figure>
          }
            <div class="card-body">
              <h2 class="card-title">{{title()}}</h2>
              <p>{{ description() }}</p>
              <div class="card-actions justify-end">
                <a [href]="button()?.url" class="btn btn-primary">
                    {{button()?.label}}
                </a>
              </div>
            </div>
          </div>
    
    `
})
export class CardComponent{
    title = input<string>('');
    description = input<string>('');
    img = input<string>('');
    button = input<{label: string; url: string}>();
}