import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrderResponse } from '../../domain/model/orderResponse';

@Injectable({
  providedIn: 'root',
})
export class GetOrderByIdService {
  private http = inject(HttpClient);

  execute(id: number): Observable<IOrderResponse> {
    return this.http.get<IOrderResponse>(`http://localhost:8080/orders/${id}`);
  }
}
