import { Observable, ReplaySubject } from 'rxjs/index';

export class StateModel<T> {
  protected subject: ReplaySubject<T>;
  protected observableSubject: Observable<T>;

  protected getSubject(): ReplaySubject<T> {
    if (!this.subject) {
      this.subject = new ReplaySubject(1);
    }

    return this.subject;
  }

  protected getObservableSubject(): Observable<T> {
    if (!this.observableSubject) {
      this.observableSubject = this.getSubject().asObservable();
    }

    return this.observableSubject;
  }

  protected set(data: T): void {
    this.getSubject().next(data);
  }

  protected get(): Observable<T> {
    return this.getObservableSubject();
  }

}
