import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';

// function confirmPasswordIsValid(control: AbstractControl){
//   if(control.value != )
// }

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  // private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    passwordGroup: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmPassword: new FormControl(''),
    }),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required] }),
      number: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] }),
    }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', {
      validators: [Validators.required],
    }),
    agree: new FormControl(false, [Validators.required]),
  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.invalid &&
      this.form.controls.email.touched &&
      this.form.controls.email.dirty
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.passwordGroup.controls.password.invalid &&
      this.form.controls.passwordGroup.controls.password.touched &&
      this.form.controls.passwordGroup.controls.password.dirty
    );
  }

  // get confirmPasswordIsInvalid() {
  //   return (
  //     this.form.hasError('confirmPasswordIsInvalid') &&
  //     (this.form.controls.confirmPassword.dirty || this.form.controls.password.dirty)
  //   );
  // }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form.value.email);
    console.log(this.form.controls.passwordGroup.value.password);
  }

  onReset() {
    this.form.reset();
  }
}
