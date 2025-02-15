import { Component, input, signal } from '@angular/core';

import { NgLibsRoute, SideMenuItem } from '@mailhyuil/ng-libs/admin';
import { SideMenuItemComponent } from '../side-menu-item/side-menu-item.component';

@Component({
  selector: 'mh-side-menu',
  standalone: true,
  imports: [SideMenuItemComponent],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  menus = signal<SideMenuItem[]>([]);
  logo = input.required<string>();
  routes = input<NgLibsRoute[]>([]);

  constructor() {
    this.initMenus();
  }

  initMenus() {
    const routes = this.routes();
    if (!routes) {
      throw new Error('SideMenuComponent: routes is required');
    }

    const menuRoutes = routes.filter((route) => !route.data?.menu?.skip);

    const menus = menuRoutes.reduce((prev, cur) => {
      const menu: SideMenuItem = {
        title: '',
        icon: '',
      };

      if (cur.data?.['menu']) {
        menu.title = cur.data?.['menu'].title;
        menu.icon = cur.data?.['menu'].icon;
        menu.link = cur.data?.['menu'].link;
      }

      if (cur?.children?.length) {
        menu.children = [];
        cur.children.forEach((child) => {
          if (child.data?.['menu']) {
            menu.children?.push(child.data?.['menu']);
          }
        });
      }

      prev.push(menu);
      return prev;
    }, [] as SideMenuItem[]);

    if (menus) {
      this.menus.set(menus);
    }
  }
}
