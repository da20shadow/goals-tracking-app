import { FormGroup, ValidatorFn } from "@angular/forms";

export function sameValueValidator(controlName: string, controlName2: string): ValidatorFn {
  return (control) => {

    const group = control as FormGroup;
    const ctrl1 = group.get(controlName);
    const ctrl2 = group.get(controlName2);

    return ctrl1?.value === ctrl2?.value ? null : {sameValueValidator: true};
  }
}
