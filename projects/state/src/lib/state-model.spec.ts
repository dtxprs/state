import { StateModel } from './state-model';
import { StateComponent } from './state.component';

describe('StateModel', () => {
  let model;
  const event1 = 'e1';

  beforeEach(() => {
    model = new StateModel();
  });

  it('should create an instance', () => {
    expect(new StateModel()).toBeTruthy();
  });


  it('set should add new subject into the list', () => {
    // initially subjects should be an empty object
    expect(model['subjects']).toEqual(jasmine.objectContaining({}));

    model['set'](event1, true);
    expect(model['subjects'][event1]).toBeTruthy();
  });

  it('get should return the subject', () => {
    // initially subjects should be an empty object
    expect(model['subjects']).toEqual(jasmine.objectContaining({}));

    const subjectObject = model['get'](event1);
    expect(subjectObject).toBeTruthy();
  });
});
