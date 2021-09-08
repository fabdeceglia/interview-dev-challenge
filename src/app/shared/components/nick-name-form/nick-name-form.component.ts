import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NickNameFormService } from './nick-name-form.service';

@Component({
  selector: 'nick-name-form',
  templateUrl: './nick-name-form.component.html',
  styleUrls: ['./nick-name-form.component.scss']
})
export class NickNameFormComponent implements OnChanges {

  @Input() disabled = false;

  usernameFormGroup: FormGroup;

  constructor(
    private readonly nickNameFormService: NickNameFormService
  ) {
    this.usernameFormGroup = new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required],
        asyncValidators: [(control: AbstractControl) => this.nickNameFormService.nicknameValidator(control)],
        updateOn: 'blur'
      })
    });
  }

  get usernameFormControl(): FormControl {
    return this.usernameFormGroup.get('username') as FormControl;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const disabled = changes.disabled.currentValue;
    if (disabled) {
      this.usernameFormControl.setValue('');
      this.usernameFormControl.disable();
    } else {
      this.usernameFormControl.enable();
    }
  }

}
