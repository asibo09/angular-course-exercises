import { Component, input } from "@angular/core";

@Component({
    selector: 'app-stats',
    template: `

    <!-- Daisy Stat -->
        <!-- https://daisyui.com/components/stat/  -->

        <div class="flex justify-center my-12">
          <div class="stats shadow stats-vertical sm:stats-horizontal">
            <div class="stat">
              <div class="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block h-8 w-8 stroke-current">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <div class="stat-title"> {{ start().title}} </div>
              <div class="stat-value text-primary">{{start().value}}</div>
              <div class="stat-desc">{{start().description}}</div>
            </div>

            <div class="stat">
              <div class="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block h-8 w-8 stroke-current">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div class="stat-title">{{center().title}}</div>
              <div class="stat-value text-secondary">{{center().value}}</div>
              <div class="stat-desc">{{center().description}}</div>
            </div>

            <div class="stat">
                @if (end().img) {
                    <div class="stat-figure text-secondary">
                        <div class="avatar online">
                        <div class="w-16 rounded-full">
                            <img [src]="end().img" />
                        </div>
                        </div>
                    </div>
                }
              <div class="stat-value">{{end().title}}</div>
              <div class="stat-title">{{end().value}}</div>
              <div class="stat-desc text-secondary">{{end().description}}</div>
            </div>
          </div>

        </div>
    
    `
})
export class StatsComponent{
    start = input.required<StatsData>();
    center = input.required<StatsData>();
    end = input.required<StatsData>();
}

interface StatsData {
    value: string;
    title: string;
    description: string;
    img?: string;
}