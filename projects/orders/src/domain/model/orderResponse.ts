import { IDish } from 'dishes';

export interface IOrderResponse {
  id: number;
  reservationId: number;
  dishes: IDish[];
  status: string;
  totalPrice: number;
}
