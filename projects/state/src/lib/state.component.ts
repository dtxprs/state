import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/index';

export class StateComponent implements OnDestroy {
  protected rxSubscriptions$: Subscription[] = [];

  constructor() { }

  ngOnDestroy() {
    this.rxSubscriptions$.forEach(subscription => {
      subscription.unsubscribe();
    });

    this.rxSubscriptions$ = [];
  }

  protected autoUnsubscribe(subscription: Subscription): void {
    this.rxSubscriptions$.push(subscription);
  }

}
