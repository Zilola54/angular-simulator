import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  
  private _isLoading$ =  new BehaviorSubject(false);
  
  public readonlyIsLoading$ = this._isLoading$.asObservable();
  
  public showLoader(): void {
    this._isLoading$.next(true)
  }

  public hideLoader() : void {
    this._isLoading$.next(false)
  }
}
