import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import jsonData from '../assets/bloodpressure.json';
import { Children } from './models/genModels.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Ehr';
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [];

  ngOnInit(): void {
    this.fields = this.mapJsonToFormly(jsonData);
  }

  // mapJsonToFormly(jsonData: any): FormlyFieldConfig[] {
  //   const fields: FormlyFieldConfig[] = [];

  //   const processNode = (node: any, parentPath: string = '') => {
  //     const aqlPath = parentPath + node.aqlPath;

  //     if (node.inputs) {
  //       node.inputs.forEach((input: any) => {
  //         fields.push({
  //           key: aqlPath + (input.suffix ? `/${input.suffix}` : ''),
  //           type: 'input',
  //           props: {
  //             label: node.name,
  //             placeholder: `Enter ${node.name}`,
  //             required: node.min === 1,
  //           },
  //         });
  //       });
  //     }

  //     if (node.children) {
  //       node.children.forEach((child: any) => processNode(child, aqlPath));
  //     }
  //   };

  //   processNode(jsonData.tree);

  //   return fields;
  // }
  dvQuantity(node: any): string {
    let html: string = '';
    html += `<label>${node.name} :  </label>`;
    if (node.inputs) {
      node.inputs.forEach((child: any) => {
        switch (child.suffix) {
          case 'magnitude': {
            html += `<input type="number" id="${child.suffix}_magnitude" name="${child.suffix}_magnitude" min="${child.validation?.range?.min}" max="${child.validation?.range?.max}">`;
            break;
          }
          case 'unit': {
            if (child.list && child.list.length > 0) {
              html += `<select id="${child.suffix}_unit" name="${child.suffix}_unit">`;
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
    return html;
  }

  dvDuration(node: any): string {
    let html: string = '';
    html += `<label>${node.name || node.localizedName || node.id} : </label>`;
    if (node.inputs) {
      node.inputs.forEach((child: any) => {
        html += `<label for="${child.suffix}_unit">${child.suffix}:</label>`;
        //TO Check Below range Validation is
        html += `<input type="number" class='duration'id="${child.suffix}_magnitude" name="${child.suffix}_magnitude" min="${child.validation.range.min}" max="${child.validation.range.max}"> &nbsp; &nbsp;`;
      });
    }
    return html;
  }

  dvDateTime(node: Children): string {
    let html: string = '';
    html += `<label>${
      node.name || node.localizedName || node.id
    }</label> : <input type="datetime-local" /><br>`;
    return html;
  }

  dvCodedText(node: Children): string {
    let html: string = '';
    html += `<label>${node.name || node.localizedName || node.id} : </label>`;
    if (node.inputs) {
      node.inputs.forEach((child: any) => {
        if (child.list && child.list.length > 0) {
          html += `<select id="${child.suffix}_unit" name="${child.suffix}_unit">`;
          html += `<option></option>`;
          child.list.forEach((item: any) => {
            html += `<option value="${item.value}">${item.label}</option>`;
          });
          html += `</select><br>`;
        }
      });
    }
    return html;
  }

  dvText(node: Children): string {
    let html: string = '';
    html += `<label>${
      node.name || node.localizedName
    }</label> : <input type="text" /><br>`;
    return html;
  }
  dvCount(node: Children): string {
    let html: string = '';
    html += `<label>${
      node.name || node.localizedName
    }</label> : <input type="number" /><br>`;
    return html;
  }

  dvProportion(node: Children): string {
    let html: string = '';
    html += `<label> ${
      node.name || node.localizedName
    } </label> <input type="number" / > <br>`;
    return html;
  }

  dvIdentifier(node: Children): string {
    let html: string = '';
    html += `<h3>${node.name || node.localizedName}</h3>`;
    if (node.inputs) {
      node.inputs.forEach((child: any) => {
        html += `<label> ${child.suffix} </label> : <input type="text" / > <br>`;
      });
    }

    return html;
  }
  dvBoolean(node: Children): string {
    let html: string = '';
    html += `<input type="checkbox" id="${node.id}" name="${node.name}" value="${node.id}">
  <label for="${node.name}"> ${node.name}</label><br>`;
    return html;
  }
  dvInterval(node: Children): string {
    let html: string = '';
    html += `<h4>${node.name || node.localizedName} Interval</h4>`;
    return html;
  }
  dvDate(node: Children): string {
    let html: string = '';
    html += `<label> ${
      node.name || node.localizedName
    } </label> <input type="date" / > <br>`;
    return html;
  }
  dvTime(node: Children): string {
    let html: string = '';
    html += `<label> ${
      node.name || node.localizedName
    } </label> <input type="time" / > <br>`;
    return html;
  }
  dvMultimedia(node: Children): string {
    let html: string = '';
    html += `<input type="file" id="myFile" name="filename">`;
    return html;
  }

  rmClassifier(
    node: Children,
    fields: FormlyFieldConfig[],
    aqlPath: string
  ): void {
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
          html += this.dvDateTime(node);
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
  }
  mapJsonToFormly(jsonData: any): FormlyFieldConfig[] {
    const fields: FormlyFieldConfig[] = [];

    const processNode = (node: Children, parentPath: string = '') => {
      const aqlPath = parentPath + node.aqlPath;

      if (!node.inContext) {
        console.log(node.id);
        this.rmClassifier(node, fields, aqlPath);
      }
      //Below contains all the renderable fields just for reference
      if (node.inputs && !node.inContext) {
        node.inputs.forEach((input: any) => {
          fields.push({
            key: aqlPath + (input.suffix ? `/${input.suffix}` : ''),
            type: 'input',
            props: {
              label: node.name + ' ' + input.suffix,
              placeholder: `Enter ${node.name}`,
              required: node.min === 1,
            },
          });
        });
      }

      if (node.children) {
        node.children.forEach((child: any) => processNode(child, aqlPath));
      }
    };

    processNode(jsonData.tree); //Template Parsing Begins Here

    return fields;
  }

  onSubmit(model: any) {
    console.log(model);
  }
}
