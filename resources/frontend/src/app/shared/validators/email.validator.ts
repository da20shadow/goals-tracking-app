import { ValidatorFn } from "@angular/forms";

export function emailValidator(): ValidatorFn {

  const pattern = new RegExp(`^([a-z]+)\\w{2,}[@][a-z_-]{3,45}[.][a-z]{2,5}$`);

  return (control) => {
    return (control.value === '' || pattern.test(control.value))
      ? null
      : {emailValidator: true};
  }
}
