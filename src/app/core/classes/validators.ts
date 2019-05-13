import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators as ngValidators, FormGroup, FormArray } from '@angular/forms';

export class Validators {

  private static methodWrapper(methodName: string, message: string, argument: any): ValidatorFn {
    const _validator = ngValidators[methodName](argument);
    return (control: AbstractControl): ValidationErrors | null => {
      const error = _validator(control);
      return Validators.handleError(error, message);
    };
  }

  /**
   * Wraps default Angular validators which return ValidationErrors
   */
  private static methodWrapperError(methodName: string, message: string, argument: any): ValidationErrors | null {
    const error = ngValidators[methodName](argument);
    return Validators.handleError(error, message);
  }

  /**
   * Returns validation error message, if it exists
   */
  private static handleError(error: ValidationErrors, message: string): ValidationErrors | null {
    if (error) {
      const firstError = Object.keys(error)[0];
      return { [firstError]: { message } };
    }
    return null;
  }

  /**
   * Wrap default ngValidators
   */

  /**
   * Validator that requires the control's value to be greater than or equal to the
   * provided number.
   */
  static min(min: number): ValidatorFn {
    const message = `The input must be greater then equal to the ${min}`;
    ;
    return Validators.methodWrapper('min', message, min);
  }

  /**
   * Validator that requires the control's value to be less than or equal to the provided
   * number.
   */
  static max(max: number): ValidatorFn {
    const message = `The input must be less ot then ${max}`;
    return Validators.methodWrapper('max', message, max);
  }

  /**
   * Validator that requires the control have a non-empty value.
   */
  static required(control: AbstractControl | null): ValidationErrors | null {
    const key = 'required';
    const message ='The input is required';
    if (control.value && typeof control.value === 'string' && !control.value.trim()) {
      return { [key]: { message } };
    }
    return Validators.methodWrapperError(key, message, control);
  }

  /**
   * Validator that requires the control's value pass an email validation test.
   */
  static email(control: AbstractControl): ValidationErrors | null {
    const message = 'The email format is invalid';
    return Validators.methodWrapperError('email', message, control);
  }

  /**
   * Validator that requires the control's value to match a regex pattern.
   */
  static pattern(pattern: string | RegExp): ValidatorFn {
    const message = 'The format is invalid';
    return Validators.methodWrapper('pattern', message, pattern);
  }
}