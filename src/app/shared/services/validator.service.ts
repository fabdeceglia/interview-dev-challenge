import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  validateMail(value: string): Observable<boolean> {
    return of(true);
  }

  validateUsername(value: string): Observable<boolean> {
    return of(true);
  }

  validatePassword(value: string): Observable<boolean> {
    return of(true);
  }

}
