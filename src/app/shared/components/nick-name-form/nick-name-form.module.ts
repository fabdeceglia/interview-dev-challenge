import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NickNameFormComponent } from './nick-name-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';



@NgModule({
    declarations: [
        NickNameFormComponent
    ],
    exports: [
        NickNameFormComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class NickNameFormModule { }
