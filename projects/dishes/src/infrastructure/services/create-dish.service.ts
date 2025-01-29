import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateDishService {
  private https = inject(HttpClient);

  execute(dish: Partial<IDi>);
}
