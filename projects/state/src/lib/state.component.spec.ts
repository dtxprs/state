import { Subscription } from 'rxjs';
import { StateComponent } from './state.component';

describe('StateComponent', () => {
  let state;
  let subscriptionSpy;

  beforeEach(() => {
    state = new StateComponent();

    // create `subscription` spy on an object representing the Subscription
    subscriptionSpy = jasmine.createSpyObj('Subscription', ['unsubscribe']);
  });

  it('should create an instance', () => {
    expect(state).toBeTruthy();
  });

  it('autoUnsubscribe should add new subscriber into the list', () => {
    expect(state['rxSubscriptions$'].length).toBe(0);
    // call private method autoUnsubscribe(subscription)
    state['autoUnsubscribe'](subscriptionSpy);
    expect(state['rxSubscriptions$'].length).toBe(1);
  });

  it('ngOnDestroy should remove all subscribers', () => {
    expect(state['rxSubscriptions$'].length).toBe(0);
    // add 2 new subscriber
    state['rxSubscriptions$'].push(subscriptionSpy);
    state['rxSubscriptions$'].push(subscriptionSpy);
    expect(state['rxSubscriptions$'].length).toBe(2);
    // call ngOnDestroy
    state.ngOnDestroy();
    expect(subscriptionSpy.unsubscribe.calls.count()).toEqual(2);
    expect(state['rxSubscriptions$'].length).toBe(0);
  });
});
