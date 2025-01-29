import { inject, Injectable } from '@angular/core';
import { ICustomer } from '../../domain/model/customer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EditCustomerService {
  private http = inject(HttpClient);

  getCustomer(id: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(`http://localhost:8080/customers/${id}`);
  }

  execute(id: number, customer: Partial<ICustomer>): Observable<ICustomer> {
    return this.http.put<ICustomer>(
      `http://localhost:8080/customers/${id}`,
      customer
    );
  }
}
