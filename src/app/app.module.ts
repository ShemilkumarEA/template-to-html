import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyValidationMessage } from '@ngx-formly/core/lib/templates/formly.validation-message';
import { FormlyHorizontalWrapper } from './formly-horizontal.component';
import { UnitWrapper } from './unit.component';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      wrappers: [
        { name: 'formly-horizontal-wrapper', component: FormlyHorizontalWrapper },
        { name: 'unit-wrapper', component: UnitWrapper },
      ],
      validationMessages: [{ name: 'required', message: 'This field is required' }],
    }),
  ],
  bootstrap: [AppComponent],
  declarations: [AppComponent, FormlyHorizontalWrapper],
})
export class AppModule { }
