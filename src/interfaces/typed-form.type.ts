import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type TypedForm<T> = {
  [K in keyof T]-?: T[K] extends object
    ? T[K] extends Date
      ? FormControl<T[K]>
      : FormGroup<TypedForm<T[K]>>
    : FormControl<T[K]>;
};