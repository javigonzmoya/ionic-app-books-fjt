import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const validateMachPassword: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password1 = control.get('password1');
  const password2 = control.get('password2');

  return password1.value === password2.value ? null : { notSame: true };
};
