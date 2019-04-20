import { ReplaySubject } from 'rxjs/index';

interface SubjectsType<T> {
  [key:string] : ReplaySubject<T>
}

export class StateModel<T> {
  protected subjects: SubjectsType<T> = {};

  protected getSubject(eventName: string): ReplaySubject<T> {
    if (!this.subjects[eventName]) {
      this.subjects[eventName] = new ReplaySubject(1);
    }

    return this.subjects[eventName];
  }

  protected set(eventName: string, data: T): void {
    this.getSubject(eventName).next(data);
  }

  protected get(eventName: string): ReplaySubject<T> {
    return this.getSubject(eventName);
  }

}
