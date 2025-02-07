import { Component, inject, input, output, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ClickOutsideDirective } from '@mailhyuil/ng-libs';
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs';

interface Auth {
  name: string;
  roles: string[];
}

@Component({
  selector: 'mh-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [ClickOutsideDirective],
  providers: [CookieService],
})
export class HeaderComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);

  title = signal('');
  breadcrumbs = signal('');
  isOpen = signal(false);

  logout = output<void>();
  auth = input<Auth | undefined>();
  constructor() {
    this.router.events
      .pipe(filter((ev) => ev instanceof NavigationEnd))
      .subscribe((_) => {
        this.initTitle();
        this.initBreadcrumbs();
      });
  }

  initTitle() {
    let route = this.route.snapshot;
    while (route.firstChild) {
      route = route.firstChild;
      if (route.data['breadcrumb'] && route.data['breadcrumb'] !== 'skip') {
        this.title.set(route.data['breadcrumb']);
        break;
      }
    }
  }

  initBreadcrumbs() {
    let route = this.route.snapshot;
    const breadcrumbs = [];
    while (route.firstChild) {
      route = route.firstChild;
      if (!route.data['breadcrumb'] || route.data['breadcrumb'] === 'skip') {
        continue;
      }
      breadcrumbs.push(route.data['breadcrumb']);
    }
    this.breadcrumbs.set(breadcrumbs.join(' > '));
  }

  toggleOpen() {
    this.isOpen.update((value) => !value);
  }
}
