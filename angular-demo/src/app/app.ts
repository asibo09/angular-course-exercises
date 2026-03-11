  import { Component, inject, signal } from '@angular/core';
import { HeroComponent } from '../component/hero.component';
import { StatsComponent } from '../component/stats.component';
import { CardComponent } from '../component/card.component';
import { FooterComponent } from '../component/footer.component';
import { DomSanitizer } from '@angular/platform-browser';
  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [HeroComponent, StatsComponent, CardComponent, FooterComponent],
    template: `
      <div class="max-w-screen-xl mx-auto">
        
      <app-hero
        [title]="data().hero.title"
        [description]="data().hero.description"
        [img]="data().hero.description"
        [button]="data().hero.button"
        />

      <app-stats 
        [start]="data().stats.start"
       [center]="data().stats.center"
       [end]="data().stats.end"
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-6">
      @for (card of data().cards; track $index) {
        <app-card
          [title]="card.title"
          [description]="card.description"
          [img]="card.img"
          [button]="card.button"
        />
      }  


    <app-footer 
      [title]="data().footer.title" 
      [description]="data().footer.description" 
      [start]="data().footer.start" 
      [center]="data().footer.center" 
      [end]="data().footer.end"
    >
      <div [innerHTML]="sanitizer.bypassSecurityTrustHtml(data().footer.image)"></div>
    </app-footer>
      
  </div>
    `,
  })
  export class App {
    data = signal(initialValue);
    sanitizer = inject(DomSanitizer)
  }

    const initialValue = {
  hero: {
    title: 'Free Books & Courses',
    description:
      'Learn {Web} programming with Courses, Exercises & Tips from Experts',
    img: 'https://www.learnbydo.ing/images/logo/logo-dark-mode.png',
    button: { label: 'Start now', url: 'https://www.learnbydo.ing/' },
  },
  stats: {
    start: {
      value: '1.5K',
      title: 'Likes',
      description: '21% more than last month',
    },
    center: {
      value: '100K',
      title: 'Page Views',
      description: '21% more than last month',
    },
    end: {
      value: '12',
      title: 'Articles',
      description: 'every week',
      img: 'https://www.learnbydo.ing/images/logo/do-dark-mode.png',
    },
  },
  cards: [
    {
      title: 'NextJS Server Action and Google Spreadsheet',
      description:
        'How we have used NextJS server actions to store data in a Google Spreadsheet',
      img: 'https://www.learnbydo.ing/diary/2024-06-13-next-js-server-action-and-google-spreadsheet/opengraph-image.png',
      button: {
        label: 'Read Now',
        url: 'https://www.learnbydo.ing/diary/2024-06-13-next-js-server-action-and-google-spreadsheet',
      },
    },
    {
      title: 'Automate actions  creating an interactive CLI with PlopJS',
      description:
        'How we automated some tasks by creating an interactive CLI with code generators',
      img: 'https://www.learnbydo.ing/diary/2024-06-10-automate-actions-in-frontend-project-with-plop/opengraph-image.png',
      button: {
        label: 'Read Now',
        url: 'https://www.learnbydo.ing/diary/2024-06-10-automate-actions-in-frontend-project-with-plop',
      },
    },
    {
      title:
        'NextJS: load, analyse and update (Excalidraw) SVG in Server components',
      description:
        'In this article we describe the technique we have used to load, modify and render SVG',
      img: 'https://www.learnbydo.ing/diary/2024-06-04-next-svg-excalidraw/opengraph-image.png',
      button: {
        label: 'Read Now',
        url: 'https://www.learnbydo.ing/diary/2024-06-04-next-svg-excalidraw',
      },
    },
    {
      title: 'Debug NextJS Client and Server components with Chrome Dev Tools',
      description:
        'Learn how to debug Client and Server Components by using Chrome Dev Tools and Inspect',
      img: 'https://www.learnbydo.ing/diary/2024-04-20-debug-react-server-component-in-nextjs/opengraph-image.png',
      button: {
        label: 'Read Now',
        url: 'https://www.learnbydo.ing/diary/2024-04-20-debug-react-server-component-in-nextjs',
      },
    },
  ],
  footer: {
    title: 'Learn by do.ing',
    description:
      'Learn {Web} programming with Courses, Exercises & Tips from Experts',
    start: {
      title: 'Services',
      links: [
        { label: 'Branding', url: 'https://www.learnbydo.ing/' },
        { label: 'Design', url: 'https://www.learnbydo.ing/' },
        { label: 'Marketing', url: 'https://www.learnbydo.ing/' },
        { label: 'Advertisement', url: 'https://www.learnbydo.ing/' },
      ],
    },
    center: {
      title: 'Company',
      links: [
        { label: 'About us', url: 'https://www.learnbydo.ing/' },
        { label: 'Contacts', url: 'https://www.learnbydo.ing/' },
        { label: 'Jobs', url: 'https://www.learnbydo.ing/' },
        { label: 'Press Kit', url: 'https://www.learnbydo.ing/' },
      ],
    },
    end: {
      title: 'Legal',
      links: [
        { label: 'Legal', url: 'https://www.learnbydo.ing/' },
        { label: 'Terms of use', url: 'https://www.learnbydo.ing/' },
        { label: 'Privacy policy', url: 'https://www.learnbydo.ing/' },
      ],
    },
    image: `
      <svg
        width="50"
        height="50"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
        class="fill-current">
        <path
          d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
      </svg>
    `,
  },
};
