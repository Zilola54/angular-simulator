import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators, NonNullableFormBuilder } from '@angular/forms';
import { User } from '../../services/UserService';
import { TypedForm } from '../../../interfaces/typed-form.type';

type CreateUserFormModel = Omit<User, 'id'>;

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {

  private readonly fb = inject(NonNullableFormBuilder);

  @Output() create = new EventEmitter<User>();

  readonly userForm: FormGroup<TypedForm<CreateUserFormModel>> = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
    website: ['', [Validators.maxLength(100)]],

    address: this.fb.group({
      city: ['', [Validators.required, Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.maxLength(100)]],
      suite: ['', [Validators.maxLength(50)]],
      zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      
      geo: this.fb.group({
        lat: ['', [Validators.required]],
        lng: ['', [Validators.required]]
      })
    }),
    company: this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      catchPhrase: ['', [Validators.maxLength(200)]],
      bs: ['', [Validators.maxLength(100)]]
      })    
    });
  

    onSubmit(): void {
      if (this.userForm.invalid) {
        this.userForm.markAllAsTouched();
        return;
      }

    const newUser: User = {
      id: Date.now(),
      ...this.userForm.getRawValue(),
    };

    this.create.emit(newUser);
    this.userForm.reset();
  }
}
