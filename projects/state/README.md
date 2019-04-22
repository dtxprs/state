State model
=====
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Methods](#methods)
5. [Git repository](#git)
6. [Build](#build)
7. [Publish to npm](#publish)
8. [Version](#version)

### <a name="description"></a>1. Description
`StateModel` and `StateComponent` are a couple of parent classes used for 
custom state models services in Angular applications based on RxJs library.  
  
### <a name="installation"></a>2. Installation
Install the module into your application and save it as a dev 
dependency in your `package.json` file  
```
npm install ridder/state --save-dev
```

### <a name="usage"></a>3. Usage
In order to use the `StateModel` you have to to create a custom service model 
in your application and extend `StateModel<T>`:

```typescript
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { StateModel } from '../../../projects/state/src/lib/state-model';

export interface CounterState {
  value: number;
}

const enum EVENTS {
  STATE = 'COUNTER.STATE'
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
    return this.get(EVENTS.STATE);
  }

  public setState(properties: CounterState): void {
    this.state = {...this.state, ...properties};
    this.set(EVENTS.STATE, this.state);
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
```
  
Register this model service into a parent store service:
```typescript
import { Injectable } from '@angular/core';
import { CounterService } from './counter.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(public counter: CounterService) { }
}
```
  
In the components where you want to retrieve the state data via subscribers, don't forget to 
extend the `StateComponent` parent class, in order to automatically unsubscribe 
the subscribers list:
```typescript
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
```
  
and use the data in your template as subscribers or via Angular `async` pipe:
```html
<div>
  <h4>Counter value: {{counterValue}}</h4>
  <input type="button" value="Increment" (click)="increment()">
  <input type="button" value="Decrement" (click)="decrement()">

  <h4>
    Counter value (with async pipe): {{(counter$ | async).value}}
  </h4>

  <h4 *ngIf="counter$ | async as counter">
    Counter value (with async pipe and ngIf AS syntax ): {{counter.value}}
  </h4>
</div>
```
  
Full usage example can be found here: [https://github.com/dtxprs/state](https://github.com/dtxprs/state)
  
  
### <a name="methods"></a>4. Methods
  
#### transform(value: string, sanitizeBeforehand?: boolean): string
Replace the new line characters `\n` in a string with 
the `<br />` tag
Bypass security and trust the given value to be safe HTML. 
The sanitizer will leave safe HTML intact and will replace new line 
character `\n` with the `<br />` tag.  

**WARNING:** in Angular version `2.x`, calling this method with 
untrusted user data exposes your application to XSS security risks!
  
*Parameters:*  
**value** - string where to replace `\n` with `<br />` and not to 
escape the HTML tags.  
**sanitizeBeforehand** - optional boolean parameter which allows you 
optionally to sanitize the `value` string. Parameter is available only 
for Angular `4+`.  
  
*Return:*  
Method returns the new string containing `<br />` tag instead of `\n`.  
  
  
### <a name="git"></a>5. Git repository
[https://github.com/dtxprs/state](https://github.com/dtxprs/state)

### <a name="build"></a>6. Build
To build the final package run this command:
```
ng build state
```
The build process will generate the packed sources into the `dist` folder.  

### <a name="publish"></a>7. Publish to npm
To publish the new version to `npm`, go into the `dist` folder:
```
cd ./dist/state
```
and publish it to npm:
```
npm publish
```

### <a name="version"></a>8. Version
1.0.0
