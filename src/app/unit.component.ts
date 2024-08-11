import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'unit-wrapper',
  template: `
  
  <div class="d-flex align-items-center justify-content-between w-130 ml-4">
        <label [attr.for]="id" class="col-form-label">
          {{ props.label }}
        </label>
        <div class="d-flex align-items-center w-50">
        <ng-template #fieldComponent></ng-template>
        </div>
      </div>
  `,
})
export class UnitWrapper extends FieldWrapper {}