import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ValidatorService } from '../../services/validator.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PasswordFormService {

  constructor(
    private readonly validatorService: ValidatorService
  ) { }

  validatePassword(value: string): Observable<boolean> {
    return this.validatorService.validatePassword(value);
  }

  passwordValidator(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.validatePassword(control.value).pipe(
      map(valid => (!valid ? { weakPassword: true } : null)),
      catchError(() => of(null))
    );
  }
}
