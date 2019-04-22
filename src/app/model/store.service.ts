import { Injectable } from '@angular/core';
import { CounterService } from './counter.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(public counter: CounterService) { }
}
