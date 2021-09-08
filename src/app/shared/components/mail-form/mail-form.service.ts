import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ValidatorService } from '../../services/validator.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class MailFormService {

  constructor(
    private readonly validatorService: ValidatorService
  ) { }

  validateEmail(value: string): Observable<boolean> {
    return this.validatorService.validateMail(value);
  }

  emailValidator(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.validateEmail(control.value).pipe(
      map(valid => (!valid ? { invalidEmail: true } : null)),
      catchError(() => of(null))
    );
  }
}
