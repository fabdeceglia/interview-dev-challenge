import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailFormComponent } from './mail-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';



@NgModule({
    declarations: [
        MailFormComponent
    ],
    exports: [
        MailFormComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class MailFormModule { }
