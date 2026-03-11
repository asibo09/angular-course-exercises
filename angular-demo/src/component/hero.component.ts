import { Component, input } from "@angular/core";

@Component({
    selector: 'app-hero',
    template: `
        <div class="hero bg-base-200">
          <div class="hero-content flex-col lg:flex-row">
            <img
              [src]="img()"
              class="max-w-sm rounded-lg shadow-2xl" />
            <div>
              <h1 class="text-5xl text-white
               font-bold">{{title()}}</h1>
              <p class="py-6 text-white">
                {{ description() }}
              </p>
              <button class="btn btn-primary">
                {{ button() }}
            </button>
            </div>
          </div>
        </div>
    `
})
export class HeroComponent{
    title = input<string>('');
    description = input<string>('');
    img = input<string>('');
    button = input<{label: string; url: string}>();
}