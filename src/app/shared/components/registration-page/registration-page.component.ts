import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  OnChanges, OnDestroy, OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';
import { MailFormComponent } from '../mail-form/mail-form.component';
import { NickNameFormComponent } from '../nick-name-form/nick-name-form.component';
import { PasswordFormComponent } from '../password-form/password-form.component';
import { ViewMode } from '../../models/view-mode';
import { UIStateService } from '../../services/ui-state.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements AfterViewInit, OnDestroy, OnInit{

  // @ts-ignore
  @ViewChild('mailForm') mailForm: MailFormComponent;
  // @ts-ignore
  @ViewChild('usernameForm') usernameForm: NickNameFormComponent;
  // @ts-ignore
  @ViewChild('passwordForm') passwordForm: PasswordFormComponent;


  steps: Array<{ form: FormGroup, index: number }> = [];
  currentStep = 0;
  // @ts-ignore
  viewMode: ViewMode;

  private alive = true;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly uiStateService: UIStateService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listenForUIStateUpdate();
  }


  onContinue(): void {
    if (this.currentStep === 2 || this.viewMode === 'FULL') {
      this.validateAndSubmitForm();
    } else {
      this.nextStep();
    }
  }

  ngAfterViewInit(): void {
    this.steps = [
      {
        form: this.mailForm.emailFormGroup,
        index: 0
      },
      {
        form: this.usernameForm.usernameFormGroup,
        index: 1
      },
      {
        form: this.passwordForm.passwordFormGroup,
        index: 2
      }
    ];
    this.calculateNextStep();
  }


  ngOnDestroy(): void {
    this.alive = false;
  }

  calculateNextStep(): void {
    const firstInvalid = this.steps.filter((step) => step.form.invalid)[0];
    this.currentStep = firstInvalid ? firstInvalid.index : 2;
  }

  nextStep(): void {
    if (this.isCurrentStepValid()) {
      this.currentStep++;
    } else {
      this.markCurrentStepAsTouched();
    }
  }

  prevStep(): void {
    if (this.currentStep !== 0) {
      this.currentStep--;
      this.cdr.detectChanges();
    }
  }

  get usernameIsDisabled(): boolean {
    if (this.mailForm && this.mailForm.emailFormGroup) {
      return this.mailForm?.emailFormGroup?.invalid;
    } else {
      return true;
    }
  }

  get passwordIsDisabled(): boolean {
    return this.usernameIsDisabled || this.usernameForm?.usernameFormGroup?.invalid;
  }

  private isCurrentStepValid(): boolean {
    return this.currentStepForm.valid;
  }

  private markCurrentStepAsTouched(): void {
    return this.currentStepForm.markAllAsTouched();
  }

  get currentStepForm(): FormGroup {
    return this.steps.filter((step) => step.index === this.currentStep)[0].form;
  }

  private validateAndSubmitForm(): void {
    if (this.mailForm.emailFormGroup.valid
      && this.usernameForm.usernameFormGroup.valid
      && this.passwordForm.passwordFormGroup.valid
    ) {
      this.snackBar.open('Registration succeeded');
    }
  }

  private listenForUIStateUpdate(): void {
    this.uiStateService.screenSizeChanged$.pipe(
      takeWhile(() => this.alive)
    ).subscribe((screenSize: ViewMode) => {
      if (screenSize === 'COMPACT' && this.steps.length > 0) {
        this.calculateNextStep();
      }
      this.viewMode = screenSize;
      this.cdr.detectChanges();
    })
  }

}
