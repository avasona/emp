import { FormGroup } from '@angular/forms';

export const validateAllFormFields = (formGroup: FormGroup): void => {
  for (const control in formGroup.controls) {
    if (formGroup.controls.hasOwnProperty(control)) {
      formGroup.controls[control].markAsDirty();
      formGroup.controls[control].markAsTouched();
      formGroup.controls[control].updateValueAndValidity();
    }
  }
};
