import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  IUsers } from '../../../interfaces/IUsers';
import { User } from '../../services/UserService';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  @Output() create = new EventEmitter<User>();

  readonly userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
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
  }  

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue = this.userForm.value;

    const newUser: User = {
      id: Date.now(),
      name: formValue.name,
      username: formValue.username,
      email: formValue.email,
      phone: formValue.phone,
      website: formValue.website || '',
      address: {
        street: formValue.address.street,
        suite:  formValue.address.suite || '',
        city: formValue.address.city,
        zipcode: formValue.address.zipcode,
        geo: { 
          lat: formValue.address.geo.lat, 
          lng: formValue.address.geo.lng
        }
      },
      company: {
        name: formValue.company.name,
        catchPhrase: formValue.company.catchPhrase || '',
        bs: formValue.company.bs || ''
      }
    };
    this.create.emit(newUser);

     this.userForm.reset();
  }

}
