import { FormArray, FormControl, FormGroup } from '@angular/forms';

type FormField<T> = T extends Array<infer U>
  ? FormArray<FormField<U>>
  : T extends object
  ? FormGroup<TypedForm<T>>
  : FormControl<T>;

export type TypedForm<T> = {
  [K in keyof T]-?: FormField<T[K]>;
};