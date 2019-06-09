import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { StateModel } from '../../../projects/state/src/lib/state-model';

export interface CounterState {
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class CounterService extends StateModel<CounterState> {

  constructor() {
    super();

    // set initial value of the state if it's required
    this.resetState();
  }

  private initState: CounterState = {
    value: 0
  };

  private state: CounterState = {...this.initState};

  public getState(): ReplaySubject<CounterState> {
    return this.get();
  }

  public setState(properties: CounterState): void {
    this.state = {...this.state, ...properties};
    this.set(this.state);
  }

  public resetState(): void {
    this.setState({...this.initState});
  }

  public increment(): void {
    const newValue = this.state.value + 1;
    this.setState({...this.state, value: newValue});
  }

  public decrement(): void {
    const newValue = this.state.value - 1;
    this.setState({...this.state, value: newValue});
  }
}
