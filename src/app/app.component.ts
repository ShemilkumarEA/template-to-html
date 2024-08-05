import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import bloodpressure from '../assets/bloodpressure.json';
import covidForm from '../assets/covidform.json';
import opd from '../assets/opd.json';
import allergy from '../assets/allergy.json';
import term1 from '../assets/term-v1.json';
import demo from '../assets/demo.v0.json';
import { TreeNode } from './models/basicRmTypes.interface';
import { Children, Tree } from './models/genModels.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'template-to-html';
  htmlContent: SafeHtml = '';
  form: FormGroup;
  jsonData: TreeNode[] = [];

  constructor(private sanitizer: DomSanitizer, private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.jsonData.push(bloodpressure.tree);
    // const rawHtml = this.printNodeIds(opd.tree);
    const rawHtml = this.printNodeIds(bloodpressure.tree);

    console.log('Generated HTML:', rawHtml);
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
  }

  createFormControl(node: Children) {
    if (node.inputs) {
      node.inputs.forEach((child: any) => {
        if (child.suffix) {
          const controlName = `${node.id}_${child.suffix}`;
          const validators = child.validation
            ? [
                Validators.min(child.validation.range.min),
                Validators.max(child.validation.range.max),
              ]
            : [];
          this.form.addControl(controlName, new FormControl('', validators));
        }
      });
    }
  }

  dvQuantity(node: Children): string {
    let html: string = '';
    html += `<label>${node.name} : </label>`;
    if (node.inputs) {
      node.inputs.forEach((child: any) => {
        const controlName = `${node.id}_${child.suffix}`;
        switch (child.suffix) {
          case 'magnitude': {
            html += `<input type="number" formControlName="${controlName}" min="${child.validation?.range?.min}" max="${child.validation?.range?.max}">`;
            break;
          }
          case 'unit': {
            if (child.list && child.list.length > 0) {
              html += `<select formControlName="${controlName}">`;
              child.list.forEach((item: any) => {
                html += `<option value="${item.value}">${item.label}</option>`;
              });
              html += `</select>`;
            }
            break;
          }
          default:
            break;
        }
      });
    }
    this.createFormControl(node);
    return html;
  }

  dvDuration(node: Children): string {
    let html: string = '';
    html += `<label>${node.name || node.localizedName || node.id} : </label>`;
    if (node.inputs) {
      node.inputs.forEach((child: any) => {
        const controlName = `${node.id}_${child.suffix}`;
        html += `<label for="${controlName}">${child.suffix}:</label>`;
        html += `<input type="number" formControlName="${controlName}" min="${child.validation.range.min}" max="${child.validation.range.max}"> &nbsp; &nbsp;`;
      });
    }
    this.createFormControl(node);
    return html;
  }

  dvDateTime(node: Children): string {
    let html: string = '';
    const controlName = `${node.id}_datetime`;
    html += `<label>${
      node.name || node.localizedName || node.id
    }</label> : <input type="datetime-local" formControlName="${controlName}"/><br>`;
    this.form.addControl(controlName, new FormControl(''));
    return html;
  }

  dvCodedText(node: Children): string {
    let html: string = '';
    html += `<label>${node.name || node.localizedName || node.id} : </label>`;
    if (node.inputs) {
      node.inputs.forEach((child: any) => {
        const controlName = `${node.id}_${child.suffix}`;
        if (child.list && child.list.length > 0) {
          html += `<select formControlName="${controlName}">`;
          html += `<option></option>`;
          child.list.forEach((item: any) => {
            html += `<option value="${item.value}">${item.label}</option>`;
          });
          html += `</select><br>`;
        }
        this.form.addControl(controlName, new FormControl(''));
      });
    }
    this.createFormControl(node);
    return html;
  }

  dvText(node: Children): string {
    let html: string = '';
    const controlName = `${node.id}_text`;
    html += `<label>${
      node.name || node.localizedName
    }</label> : <input type="text" formControlName="${controlName}"/><br>`;
    this.form.addControl(controlName, new FormControl(''));
    return html;
  }

  dvCount(node: Children): string {
    let html: string = '';
    const controlName = `${node.id}_count`;
    html += `<label>${
      node.name || node.localizedName
    }</label> : <input type="number" formControlName="${controlName}"/><br>`;
    this.form.addControl(controlName, new FormControl(''));
    return html;
  }

  dvProportion(node: Children): string {
    let html: string = '';
    const controlName = `${node.id}_proportion`;
    html += `<label>${
      node.name || node.localizedName
    }</label> : <input type="number" formControlName="${controlName}"/><br>`;
    this.form.addControl(controlName, new FormControl(''));
    return html;
  }

  dvIdentifier(node: Children): string {
    let html: string = '';
    html += `<h3>${node.name || node.localizedName}</h3>`;
    if (node.inputs) {
      node.inputs.forEach((child: any) => {
        const controlName = `${node.id}_${child.suffix}`;
        html += `<label> ${child.suffix} </label> : <input type="text" formControlName="${controlName}"/><br>`;
        this.form.addControl(controlName, new FormControl(''));
      });
    }
    this.createFormControl(node);
    return html;
  }

  dvBoolean(node: Children): string {
    let html: string = '';
    const controlName = `${node.id}_boolean`;
    html += `<input type="checkbox" formControlName="${controlName}" id="${node.id}" name="${node.name}" value="${node.id}">`;
    html += `<label for="${node.name}"> ${node.name}</label><br>`;
    this.form.addControl(controlName, new FormControl(false));
    return html;
  }

  dvInterval(node: Children): string {
    let html: string = '';
    html += `<h4>${node.name || node.localizedName} Interval</h4>`;
    this.createFormControl(node);
    return html;
  }

  dvDate(node: Children): string {
    let html: string = '';
    const controlName = `${node.id}_date`;
    html += `<label>${
      node.name || node.localizedName
    }</label> : <input type="date" formControlName="${controlName}"/><br>`;
    this.form.addControl(controlName, new FormControl(''));
    return html;
  }

  dvTime(node: Children): string {
    let html: string = '';
    const controlName = `${node.id}_time`;
    html += `<label>${
      node.name || node.localizedName
    }</label> : <input type="time" formControlName="${controlName}"/><br>`;
    this.form.addControl(controlName, new FormControl(''));
    return html;
  }

  dvMultimedia(node: Children): string {
    let html: string = '';
    const controlName = `${node.id}_file`;
    html += `<input type="file" formControlName="${controlName}" id="myFile" name="filename">`;
    this.form.addControl(controlName, new FormControl(''));
    return html;
  }

  rmClassifier(node: Children): string {
    let html = '';
    html += `<div class="${node.rmType}">`;

    if (node.rmType.startsWith('DV')) {
      switch (node.rmType) {
        case 'DV_DURATION': {
          html += this.dvDuration(node);
          break;
        }
        case 'DV_CODED_TEXT': {
          html += this.dvCodedText(node);
          break;
        }
        case 'DV_QUANTITY': {
          html += this.dvQuantity(node);
          break;
        }
        case 'DV_DATE_TIME': {
          html += this.dvDateTime(node);
          break;
        }
        case 'DV_TEXT': {
          html += this.dvText(node);
          break;
        }
        case 'DV_PROPORTION': {
          html += this.dvProportion(node);
          break;
        }
        case 'DV_IDENTIFIER': {
          html += this.dvIdentifier(node);
          break;
        }
        case 'DV_BOOLEAN': {
          html += this.dvBoolean(node);
          break;
        }
        case 'DV_COUNT': {
          html += this.dvCount(node);
          break;
        }
        case 'DV_INTERVAL<DV_DATE_TIME>': {
          html += this.dvInterval(node);
          break;
        }
        case 'DV_DATE': {
          html += this.dvDate(node);
          break;
        }
        case 'DV_TIME': {
          html += this.dvTime(node);
          break;
        }
        case 'DV_MULTIMEDIA': {
          html += this.dvMultimedia(node);
          break;
        }
        default:
          html += `<h3>${node.name} + ${node.rmType}</h3>`;
          console.log('Non-coded ui RmType' + node.name + ' ' + node.rmType);
      }
    } else {
      switch (node.rmType) {
        case 'COMPOSITION': {
          html += `<h1>${node.name}</h1>`;
          html += `<p>${node.localizedDescriptions?.en}</p>`;
          break;
        }
        case 'OBSERVATION':
        case 'INTERVAL_EVENT':
        case 'SECTION':
        case 'ADMIN_ENTRY':
        case 'POINT_EVENT':
        case 'INSTRUCTION':
        case 'ACTIVITY':
        case 'EVALUATION':
        case 'ELEMENT':
        case 'CLUSTER': {
          html += `<div ><h3>${node.name}</h3>`;
          break;
        }

        case 'EVENT_CONTEXT':
        case 'EVENT': {
          break;
        }
        default:
          html += `<h3>${node.name} + ${node.rmType}</h3>`;
          console.log(
            'Non-coded structure RmType' + node.name + ' ' + node.rmType
          );
      }
    }
    return html;
  }

  printNodeIds(node: Children): string {
    let html = '';
    if (!node.inContext) {
      html += this.rmClassifier(node);
    }

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        html += this.printNodeIds(child);
      }
    }

    html += `</div>`;
    return html;
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
