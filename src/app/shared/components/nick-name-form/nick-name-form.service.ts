import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ValidatorService } from '../../services/validator.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class NickNameFormService {

  constructor(
    private readonly validatorService: ValidatorService
  ) { }

  validateUsername(value: string): Observable<boolean> {
    return this.validatorService.validateUsername(value);
  }

  nicknameValidator(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.validateUsername(control.value).pipe(
      map(valid => (!valid ? { duplicatedNickName: true } : null)),
      catchError(() => of(null))
    );
  }
}
