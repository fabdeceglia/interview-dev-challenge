import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationPageModule } from './shared/components/registration-page/registration-page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RegistrationPageModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
