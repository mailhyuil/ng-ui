import { Component, computed, input } from '@angular/core';
import { MhRoute, SideMenuItem } from '../../types/mh-route.interface';
import { SideMenuItemComponent } from '../side-menu-item/side-menu-item.component';

@Component({
  selector: 'mh-side-menu',
  standalone: true,
  imports: [SideMenuItemComponent],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  logo = input.required<string>();
  routes = input<MhRoute[]>([]);
  menu = computed(() => {
    const routes = this.routes();
    if (!routes) {
      throw new Error('SideMenuComponent: routes is required');
    }

    const menuRoutes = routes.filter((route) => !route.data?.menu?.skip);

    const menuItems = menuRoutes.reduce((prev, cur) => {
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
    return menuItems;
  });
}
