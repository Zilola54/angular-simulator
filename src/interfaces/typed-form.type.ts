import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type TypedForm<T> = {
  [K in keyof T]: T[K] extends Array<infer U>
    ? U extends Record<string, any>
      ? FormArray<FormGroup<TypedForm<U>>>
      : FormArray<FormControl<U>>
    : T[K] extends Record<string, any>
      ? FormGroup<TypedForm<T[K]>>
      : FormControl<T[K]>;
};