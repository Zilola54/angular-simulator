import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';


@Component({
  selector: 'app-users-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {
   private readonly destroyRef: DestroyRef = inject(DestroyRef);

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  public readonly searchControl: FormControl<string> = new FormControl<string>('', { nonNullable: true });

  ngOnInit(): void {
    this.searchControl.valueChanges
    .pipe(
      debounceTime(200),
      map((value: string): string => value.trim().toLowerCase()),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe((searchQuery: string): void => {
      this.search.emit(searchQuery);
    });
  }
}
