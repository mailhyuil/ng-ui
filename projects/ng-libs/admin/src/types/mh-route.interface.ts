import { Route } from '@angular/router';

export interface MhRoute extends Route {
  data?: {
    menu?: SideMenuItem;
    [key: string]: unknown;
  };
  breadcrumb?: string | 'skip';
}

export interface SideMenuItem {
  title: string;
  icon: string;
  link?: string;
  skip?: boolean;
  children?: SideMenuItem[];
}
