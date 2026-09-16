import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

function confirmPasswordIsValid(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    if (control.get(controlName1)?.value == control.get(controlName2)?.value) {
      return null;
    }
    return { confirmPasswordIsNotValid: true };
  };
}

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
    passwordGroup: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl(''),
      },
      {
        validators: [confirmPasswordIsValid('password', 'confirmPassword')],
      },
    ),
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
    source: new FormArray([new FormControl(false), new FormControl(false), new FormControl(false)]),
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

  get confirmPasswordIsInvalid() {
    return (
      this.form.controls.passwordGroup.invalid &&
      (this.form.controls.passwordGroup.controls.confirmPassword.dirty ||
        this.form.controls.passwordGroup.controls.password.dirty)
    );
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.invalid) {
      console.log('INVALID FORM');
      return;
    }

    console.log(this.form.value);
  }

  onReset() {
    this.form.reset();
  }
}
