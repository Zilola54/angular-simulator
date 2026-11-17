import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type TypedForm<T> = {
  [K in keyof T] - ?: T[K] extends Array<infer U>
    ? U extends object
      ? FormArray<FormGroup<TypedForm<U>>>
      : FormArray<FormControl<U>>
    : T[K] extends object
      ? FormGroup<TypedForm<T[K]>>
      : FormControl<T[K]>;
};