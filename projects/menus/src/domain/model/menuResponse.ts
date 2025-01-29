import { IDish } from '../../../../dishes/src/domain/model/dish';

export interface IMenuResonse {
  id: number;
  name: string;
  dishes: IDish[];
}
