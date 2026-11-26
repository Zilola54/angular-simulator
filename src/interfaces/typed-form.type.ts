import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type TypedForm<T> = {
  [K in keyof T]: T[K] extends object
    ? FormGroup<TypedForm<T[K]>> : FormControl<T[K]>
};