import { ReplaySubject } from 'rxjs/index';

export class StateModel<T> {
  protected subject: ReplaySubject<T>;

  protected getSubject(): ReplaySubject<T> {
    if (!this.subject) {
      this.subject = new ReplaySubject(1);
    }

    return this.subject;
  }

  protected set(data: T): void {
    this.getSubject().next(data);
  }

  protected get(): ReplaySubject<T> {
    return this.getSubject();
  }

}
