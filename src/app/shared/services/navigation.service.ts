import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
  type: 'link' | 'dropDown' | 'icon' | 'separator' | 'extLink';
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  svgIcon?: string; // UI Lib icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;  // Material icon name
  svgIcon?: string; // UI Lib icon name
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable()
export class NavigationService {
  iconMenu: IMenuItem[] = [
   /* {
      name: 'HOME',
      type: 'icon',
      tooltip: 'Home',
      icon: 'home',
      state: 'home'
    },
    {
      name: 'PROFILE',
      type: 'icon',
      tooltip: 'Profile',
      icon: 'person',
      state: 'profile/overview'
    },
    {
      name: 'TOUR',
      type: 'icon',
      tooltip: 'Tour',
      icon: 'flight_takeoff',
      state: 'tour'
    },
    {
      type: 'separator',
      name: 'Main Items'
    },*/
    {
      name: 'DASHBOARD',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'dashboard',     
    },
    {
      name: 'Account Settings',
      type: 'dropDown',
      icon: 'settings',
      sub: [
        {name: 'Association Profile', state: 'underdev'},
        {name: 'Roles', state: 'underdev'},
        {name: 'Login Preference', state: 'underdev'},
        {name: 'Billing', state: 'underdev'},
        {name: 'Linked Association', state: 'underdev'}
      ]
    },
    {
      name: 'Association Settings',
      type: 'dropDown',
      icon: 'settings',
      sub: [
        {name: 'MEMBERSHIP_SETTING', state: 'associationSettings/membershipPlan'},
        {name: 'Committee Settings', state: 'associationSettings/committee'},
        {name: 'Email Settings', state: 'underdev'},
        {name: 'SMS Settings', state: 'underdev'},
        {name: 'Policies & Doc store', state: 'underdev'},
        {name: 'Finance Settings', state: 'underdev'},
        {name: 'Digital Id Card Settings', state: 'underdev'}, 
        {name: 'Visibility Settings', state: 'underdev'}, 
      ]
    },
    {
      name: 'Website Builder',
      type: 'link',
      tooltip: 'Website Builder',
      icon: 'chat',
      state: 'underdev',
      badges: [{ color: 'warn', value: '1' }]
    },
    
  ];

  separatorMenu: IMenuItem[] = [];
  plainMenu: IMenuItem[] = [];

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle = 'Quick Access';
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();
  constructor() { }

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {
    switch (menuType) {
      case 'separator-menu':
        this.menuItems.next(this.separatorMenu);
        break;
      case 'icon-menu':
        this.menuItems.next(this.iconMenu);
        break;
      default:
        this.menuItems.next(this.plainMenu);
    }
  }
}
