import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private bsLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly isLoading$: Observable<boolean> = this.bsLoading.asObservable();

  showLoading() {
    this.bsLoading.next(true);
  }

  hideLoading() {
    this.bsLoading.next(false);
  }

}
