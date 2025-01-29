import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomer } from '../../domain/model/customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetAllCustomerService {
  private http = inject(HttpClient);

  execute(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>('http://localhost:8080/customers');
  }
}
