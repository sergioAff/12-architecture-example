import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOrderResponse } from '../../domain/model/orderResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditOrderService {
  private http = inject(HttpClient);

  execute(
    id: number,
    order: Partial<IOrderResponse>
  ): Observable<IOrderResponse> {
    console.log(order);
    return this.http.put<IOrderResponse>(
      `http://localhost:8080/orders/${id}`,
      order
    );
  }
}
