import { InjectionToken } from '@angular/core';
import { NgLibsRoute } from './ng-libs-route.interface';

export interface SideMenuItem {
  title: string;
  icon: string;
  link?: string;
  skip?: boolean;
  children?: SideMenuItem[];
}

export const SIDE_MENU_ROUTES = new InjectionToken<NgLibsRoute[]>(
  'SIDE_MENU_ROUTES'
);
