import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private _isLoading$: BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);

  readonly readonlyIsLoading$: Observable<boolean> = this._isLoading$.asObservable();

  showLoader(): void {
    this._isLoading$.next(true)
  }

  hideLoader() : void {
    this._isLoading$.next(false)
  }
}
