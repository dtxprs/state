import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { StateComponent } from '../../../../projects/state/src/lib/state.component';
import { CounterState } from '../../model/counter.service';
import { StoreService } from '../../model/store.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent extends StateComponent implements OnInit {
  private counter$: ReplaySubject<CounterState>; // used for async pipe
  private counterValue: number; // used as subscriber

  constructor(private store: StoreService) {
    super();
  }

  ngOnInit() {
    this.counter$ = this.store.counter.getState();

    // unsubscribe automatically on ngOdDestroy
    this.autoUnsubscribe(this.store.counter.getState()
      .subscribe((counterData: CounterState) => {
        this.counterValue = counterData.value;
      }));
  }

  increment() {
    this.store.counter.increment();
  }

  decrement() {
    this.store.counter.decrement();
  }
}
