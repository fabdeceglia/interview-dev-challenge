import {  Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordFormService } from './password-form.service';

@Component({
  selector: 'password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnChanges {

  @Input() disabled = false;

  passwordFormGroup: FormGroup;

  constructor(
    private readonly passwordFormService: PasswordFormService
  ) {
    this.passwordFormGroup = new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required],
        asyncValidators: [(control: AbstractControl) => this.passwordFormService.passwordValidator(control)],
        updateOn: 'blur'
      })
    });
  }

  get passwordFormControl(): FormControl {
    return this.passwordFormGroup.get('password') as FormControl;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const disabled = changes.disabled.currentValue;
    if (disabled) {
      this.passwordFormControl.setValue('');
      this.passwordFormControl.disable();
    } else {
      this.passwordFormControl.enable();
    }
  }

}
