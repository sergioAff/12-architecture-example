import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDish } from '../../domain/model/dish';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateDishService {
  private http = inject(HttpClient);

  execute(id: number, dish: Partial<IDish>): Observable<IDish> {
    return this.http
      .put<IDish>(`http://localhost:8080/dishes/${id}`, dish)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    alert(
      'The dish is registered in an menu or a order. Please delete the order first'
    );
    return throwError(error);
  }
}
