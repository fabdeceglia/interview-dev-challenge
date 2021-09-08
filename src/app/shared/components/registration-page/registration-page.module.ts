import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegistrationPageComponent } from './registration-page.component';
import { MailFormModule } from '../mail-form/mail-form.module';
import { NickNameFormModule } from '../nick-name-form/nick-name-form.module';
import { PasswordFormModule } from '../password-form/password-form.module';


@NgModule({
    declarations: [
        RegistrationPageComponent
    ],
    exports: [
        RegistrationPageComponent
    ],
    imports: [
        CommonModule,
        MailFormModule,
        NickNameFormModule,
        PasswordFormModule,
        FlexModule,
        MatDividerModule,
        MatButtonModule,
        MatSnackBarModule,
        FlexLayoutModule
    ]
})
export class RegistrationPageModule { }
