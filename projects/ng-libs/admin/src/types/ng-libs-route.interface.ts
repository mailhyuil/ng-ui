import { Route } from '@angular/router';
import { SideMenuItem } from './side-menu-routes.interface';

export interface NgLibsRoute extends Route {
  data?: {
    menu?: SideMenuItem;
    [key: string]: any;
  };
  breadcrumb?: string | 'skip';
}
