import { inject, Injectable } from '@angular/core';
import { ICustomer } from '../../domain/model/customer';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CreateCustomerService {
  private http = inject(HttpClient);

  execute(customer: Partial<ICustomer>): Observable<ICustomer> {
    return this.http.post<ICustomer>(
      'http://localhost:8080/customers',
      customer,
      {
        headers: this.getHeaders(),
      }
    );
  }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append('Authorization', 'token')
      .append('Content-Type', 'application/json');
  }
}
