import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MailFormService } from './mail-form.service';

@Component({
  selector: 'mail-form',
  templateUrl: './mail-form.component.html',
  styleUrls: ['./mail-form.component.scss']
})
export class MailFormComponent {

  @Input() disabled = false;

  // @ts-ignore
  @ViewChild('emailInput') emailInput: ElementRef;

  emailFormGroup: FormGroup;

  constructor(
    private readonly mailFormService: MailFormService
  ) {
    this.emailFormGroup = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required],
        asyncValidators: [(control: AbstractControl) => this.mailFormService.emailValidator(control)]
      })
    });
  }

  get emailFormControl(): FormControl {
    return this.emailFormGroup.get('email') as FormControl;
  }

}

