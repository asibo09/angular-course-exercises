import { Component, input } from "@angular/core";

@Component({
    selector: 'app-footer',
    template: `

<footer class="footer bg-base-200 text-base-content p-10">
          <aside>
            <ng-content/>
            <p>
              {{title()}}
              <br />
              {{description()}}
            </p>
          </aside>
          <nav>
            <h6 class="footer-title">{{start().title}}</h6>
            @for (item of start().links; track $index) {
                <a class="link link-hover" [href]="item.url">{{item.label}}</a>
            }
          </nav>
          <nav>
            <h6 class="footer-title">{{center().title}}</h6>
            @for (item of center().links; track $index) {
                <a class="link link-hover" [href]="item.url">{{item.label}}</a>
            }
          </nav>
          <nav>
            <h6 class="footer-title">{{end().title}}</h6>
            @for (item of end().links; track $index) {
                <a class="link link-hover" [href]="item.url">{{item.label}}</a>
            }
          </nav>
        </footer>
    
    `
})
export class FooterComponent{
    title = input.required<string>();
    description = input.required<string>();
    start = input.required<Links>();
    center = input.required<Links>();
    end = input.required<Links>();
}

interface Links {
    title: string;
    links: Link[];
}

interface Link {
    label: string;
    url: string;
}