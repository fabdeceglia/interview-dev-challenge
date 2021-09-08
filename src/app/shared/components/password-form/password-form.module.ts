import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordFormComponent } from './password-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';



@NgModule({
    declarations: [
        PasswordFormComponent
    ],
    exports: [
        PasswordFormComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class PasswordFormModule { }
