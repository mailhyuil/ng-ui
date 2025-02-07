import { Route } from '@angular/router';
import { SideMenuItem } from './side-menu-routes.interface';

export interface NgUIRoute extends Route {
  data?: {
    menu?: SideMenuItem;
    [key: string]: any;
  };
  breadcrumb?: string | 'skip';
}
