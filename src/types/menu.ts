import { IconType } from 'react-icons';

export interface MenuItem {
  title: string;
  path: string;
  icon: IconType;
}

export interface TabItem {
  id: number;
  title: string;
  icon: IconType;
}
