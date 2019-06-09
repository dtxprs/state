import { StateModel } from './state-model';

describe('StateModel', () => {
  let model;

  beforeEach(() => {
    model = new StateModel();
  });

  it('should create an instance', () => {
    expect(new StateModel()).toBeTruthy();
  });


  it('set should add new subject into the list', () => {
    // initially subjects should be an empty object
    expect(model['subject']).not.toBeTruthy();

    model['set'](true);
    expect(model['subject']).toBeTruthy();
  });

  it('get should return the subject', () => {
    // initially subjects should be an empty object
    expect(model['subject']).not.toBeTruthy();

    const subjectObject = model['get']();
    expect(subjectObject).toBeTruthy();
  });
});
