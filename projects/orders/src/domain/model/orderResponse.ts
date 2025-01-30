import { IDish } from '../../../../dishes/src/domain/model/dish';

export interface IOrderResponse {
  id: number;
  reservationId: number;
  dishes: IDish[];
  status: string;
  totalPrice: number;
}
