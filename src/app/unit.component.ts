import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'unit-wrapper',
  template: `
    <!-- <div class="row">
      <label [attr.for]="id" class="col-sm-2 col-form-label ml-4" *ngIf="props.label">
        {{ props.label }}
        <ng-container *ngIf="props.required && props.hidden !== true">*</ng-container>
      </label>
      <div class="col-sm-7">
        <ng-template #fieldComponent></ng-template>
      </div>

      <div *ngIf="showError" class="col-sm-3 invalid-feedback d-block">
      </div>
    </div> -->
    <div>
      <ng-template #fieldComponent></ng-template>
    </div>
  `,
})
export class UnitWrapper extends FieldWrapper {}