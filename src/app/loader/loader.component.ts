import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoaderService } from '../../app/services/loader.service';
import {AsyncPipe} from '@angular/common';


@Component({
  selector: 'app-loader',
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  public readonly loaderService: LoaderService = inject(LoaderService);
  public readonly isLoading$: Observable<boolean> = this.loaderService.readonlyIsLoading$;
}
