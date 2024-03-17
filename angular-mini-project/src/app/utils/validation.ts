import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidators {
  constructor() {}

  static MatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirm_password').value; // get password from our confirmPassword form control
    // control.get('confirm_password').setErrors(null);
    // if the confirmPassword value is null or empty, don't return an error.
    if (!confirmPassword?.length) {
      return null;
    }

    // if the confirmPassword length is < 8, set the minLength error.
    if (password !== confirmPassword) {
      control.get('confirm_password').setErrors({ mismatch: true });
    } else {
      // if passwords match, don't return an error.
      return null;
    }
  }
}
