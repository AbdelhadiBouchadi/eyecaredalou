import { Patient } from './patient';

export interface BaseItem {
  id: string | number;
}

export interface SelectOption {
  id: number;
  name: string;
  value?: string | number;
}

export interface ReviewItem {
  id: number;
  user: Patient;
  star: number;
  comment: string;
  reviewAbout: {
    name: string;
    link: string;
  };
  date: string;
}

export interface ChatMessage {
  id: number;
  user: Patient;
  text: string;
  time: string;
  imageUrl: string;
  value: {
    image: boolean;
    me: boolean;
  };
}
