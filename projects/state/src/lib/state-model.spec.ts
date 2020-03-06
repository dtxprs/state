import { Observable, ReplaySubject } from 'rxjs';
import { StateModel } from './state-model';

class TestStateModel extends StateModel<boolean> {
  public set(test: boolean): void {
    super.set(test);
  }

  public get(): Observable<boolean> {
    return super.get();
  }

  public getSubjectValue(): ReplaySubject<boolean> {
    return this.subject;
  }

  public getObservableSubjectValue(): Observable<boolean> {
    return this.observableSubject;
  }
}

describe('StateModel', () => {
  let model;

  beforeEach(() => {
    model = new TestStateModel();
  });

  it('should create an instance', () => {
    expect(model).toBeTruthy();
  });

  it('set should add new subject into the list', () => {
    // initially subjects should be an empty object
    expect(model.getSubjectValue()).not.toBeTruthy();
    expect(model.getObservableSubjectValue()).not.toBeTruthy();

    model.set(true);

    expect(model.getSubjectValue()).toBeTruthy();
    expect(model.getObservableSubjectValue()).not.toBeTruthy();
  });

  it('get should return the subject', () => {
    // initially subjects should be an empty object
    expect(model.getSubjectValue()).not.toBeTruthy();
    expect(model.getObservableSubjectValue()).not.toBeTruthy();

    const observableObject = model.get();

    expect(observableObject).toBeTruthy();
    expect(model.getObservableSubjectValue()).toBeTruthy();
    expect(model.getObservableSubjectValue()).toBeTruthy();
  });
});
