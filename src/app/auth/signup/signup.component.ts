import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    repeatPassword: new FormControl('', {
      validators: [Validators.required],
    }),
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
      this.form.controls.password.invalid &&
      this.form.controls.password.touched &&
      this.form.controls.password.dirty
    );
  }

  onSubmit() {
    console.log(this.form.value.email);
    console.log(this.form.value.password);
  }

  onReset() {
    this.form.reset();
  }
}
