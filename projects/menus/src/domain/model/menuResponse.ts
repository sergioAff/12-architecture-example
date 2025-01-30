import { IDish } from 'dishes';

export interface IMenuResonse {
  id: number;
  name: string;
  dishes: IDish[];
}
