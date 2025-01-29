import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomer } from '../../domain/model/customer';

@Injectable({
  providedIn: 'root',
})
export class GetCustomerService {
  private http = inject(HttpClient);

  execute(id: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(`http://localhost:8080/customers/${id}`);
  }
}
