import { InjectionToken } from '@angular/core';
import { NgUIRoute } from './dep-route.interface';

export type SideMenuItem = {
  title: string;
  icon: string;
  link?: string;
  skip?: boolean;
  children?: SideMenuItem[];
};

export const SIDE_MENU_ROUTES = new InjectionToken<NgUIRoute[]>(
  'SIDE_MENU_ROUTES'
);
