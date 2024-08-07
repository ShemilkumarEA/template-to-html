import { Component, OnInit } from '@angular/core';
import { FormControlName, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import bloodpressure from '../assets/bloodpressure.json';
import covidForm from '../assets/covidform.json';
import opd from '../assets/opd.json';
import allergy from '../assets/allergy.json';
import term1 from '../assets/term-v1.json';
import demo from '../assets/demo.v0.json';
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
    this.fields = this.mapJsonToFormly(bloodpressure);
    // this.fields = this.mapJsonToFormly(covidForm);
    // this.fields = this.mapJsonToFormly(opd);
    // this.fields = this.mapJsonToFormly(allergy);
    // this.fields = this.mapJsonToFormly(term1);
    // this.fields = this.mapJsonToFormly(demo);
  }
  dvQuantity(
    node: Children,
    fields: FormlyFieldConfig[],
    aqlPath: string
  ): void {
    if (node.inputs) {
      node.inputs.forEach((child: any) => {
        switch (child.suffix) {
          case 'magnitude': {
            this.model = {
              ...this.model, 
              [aqlPath + `/${child.suffix}`]: {
                [child.suffix]: {
                  key: 'gloooooooory'
                }
              }
            };
            fields.push({
              fieldGroupClassName: 'row',
              wrappers: ['formly-horizontal-wrapper'],
              key: aqlPath + `/${child.suffix}`,
              type: 'input',
              templateOptions: {
                label: node.name + ' : ',
                placeholder: `Enter ${node.name}`,
                required: node.min === 1,
                min: child.validation?.range?.min,
                max: child.validation?.range?.max,
              },
            });
            break;
          }
          case 'unit': {
            if (child.list && child.list.length > 0) {
              const options = child.list.map((item: any) => {
                return { value: item.value, label: item.label };
              });
              fields.push({
                wrappers: ['formly-horizontal-wrapper'],
                key: aqlPath + `/${child.suffix}`,
                type: 'select',
                templateOptions: {
                  // label: node.name + ' ' + child.suffix,
                  options: options,
                },
              });
            }
            break;
          }
          default:
            break;
        }
      });
    }
  }

  dvDuration(
    node: Children,
    fields: FormlyFieldConfig[],
    aqlPath: string
  ): void {
    if (node.inputs) {
      node.inputs.forEach((child: any) => {
        fields.push({
          key: aqlPath + `/${child.suffix}_magnitude`,
          type: 'input',
          templateOptions: {
            label: child.suffix + ' : ',
            placeholder: `Enter ${child.suffix}`,
            required: node.min === 1,
            min: child.validation?.range?.min,
            max: child.validation?.range?.max,
          },
        });
      });
    }
  }

  dvDateTime(
    node: Children,
    fields: FormlyFieldConfig[],
    aqlPath: string
  ): void {
    fields.push({
      key: aqlPath,
      type: 'input',
      templateOptions: {
        label: node.name || node.localizedName || node.id,
        placeholder: `Enter ${node.name}`,
        required: node.min === 1,
        type: 'datetime-local',
      },
    });
  }

  dvCodedText(
    node: Children,
    fields: FormlyFieldConfig[],
    aqlPath: string
  ): void {
    if (node.inputs) {
      node.inputs.forEach((child: any) => {
        if (child.list && child.list.length > 0) {
          const options = child.list.map((item: any) => {
            return { value: item.value, label: item.label };
          });
          fields.push({
            key: aqlPath + `/${child.suffix}`,
            type: 'select',
            templateOptions: {
              label: node.name,
              options: options,
            },
            className: 'inline-field', // Add this line to make the field inline
          });
        }
      });
    }
  }

  dvText(node: Children, fields: FormlyFieldConfig[], aqlPath: string): void {
    fields.push({
      key: aqlPath,
      type: 'input',
      templateOptions: {
        label: node.name || node.localizedName,
        placeholder: `Enter ${node.name}`,
        required: node.min === 1,
      },
    });
  }
  dvCount(node: Children, fields: FormlyFieldConfig[], aqlPath: string): void {
    fields.push({
      key: aqlPath,
      type: 'input',
      templateOptions: {
        label: node.name || node.localizedName,
        placeholder: `Enter ${node.name}`,
        required: node.min === 1,
        type: 'number',
      },
    });
  }

  dvProportion(
    node: Children,
    fields: FormlyFieldConfig[],
    aqlPath: string
  ): void {
    fields.push({
      key: aqlPath,
      type: 'input',
      templateOptions: {
        label: node.name || node.localizedName,
        placeholder: `Enter ${node.name}`,
        required: node.min === 1,
        type: 'number',
      },
    });
  }

  dvIdentifier(
    node: Children,
    fields: FormlyFieldConfig[],
    aqlPath: string
  ): void {
    if (node.inputs) {
      node.inputs.forEach((child: any) => {
        fields.push({
          key: aqlPath + `/${child.suffix}`,
          type: 'input',
          templateOptions: {
            label: child.suffix + ' : ',
            placeholder: `Enter ${child.suffix}`,
            required: node.min === 1,
          },
        });
      });
    }
  }
  dvBoolean(
    node: Children,
    fields: FormlyFieldConfig[],
    aqlPath: string
  ): void {
    fields.push({
      key: aqlPath,
      type: 'checkbox',
      templateOptions: {
        label: node.name,
        id: node.id,
        name: node.name,
        value: node.id,
      },
    });
  }
  dvInterval(
    node: Children,
    fields: FormlyFieldConfig[],
    aqlPath: string
  ): void {
    fields.push({
      template: `<h4>${node.name || node.localizedName} Interval</h4>`,
    });
  }
  dvDate(node: Children, fields: FormlyFieldConfig[], aqlPath: string): void {
    fields.push({
      key: aqlPath,
      type: 'input',
      templateOptions: {
        label: node.name || node.localizedName,
        placeholder: `Enter ${node.name}`,
        required: node.min === 1,
        type: 'date',
      },
    });
  }
  dvTime(node: Children, fields: FormlyFieldConfig[], aqlPath: string): void {
    fields.push({
      key: aqlPath,
      type: 'input',
      templateOptions: {
        label: node.name || node.localizedName,
        placeholder: `Enter ${node.name}`,
        required: node.min === 1,
        type: 'time',
      },
    });
  }
  dvMultimedia(
    node: Children,
    fields: FormlyFieldConfig[],
    aqlPath: string
  ): void {
    fields.push({
      key: aqlPath,
      type: 'input',
      templateOptions: {
        label: node.name,
        placeholder: `Select ${node.name}`,
        type: 'file',
      },
    });
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
          this.dvDuration(node, fields, aqlPath);
          break;
        }
        case 'DV_CODED_TEXT': {
          this.dvCodedText(node, fields, aqlPath);
          break;
        }
        case 'DV_QUANTITY': {
          this.dvQuantity(node, fields, aqlPath);
          break;
        }
        case 'DV_DATE_TIME': {
          this.dvDateTime(node, fields, aqlPath);
          break;
        }
        case 'DV_TEXT': {
          this.dvText(node, fields, aqlPath);
          break;
        }
        case 'DV_PROPORTION': {
          this.dvProportion(node, fields, aqlPath);
          break;
        }
        case 'DV_IDENTIFIER': {
          this.dvIdentifier(node, fields, aqlPath);
          break;
        }
        case 'DV_BOOLEAN': {
          this.dvBoolean(node, fields, aqlPath);
          break;
        }
        case 'DV_COUNT': {
          this.dvCount(node, fields, aqlPath);
          break;
        }
        case 'DV_INTERVAL<DV_DATE_TIME>': {
          this.dvInterval(node, fields, aqlPath);
          break;
        }
        case 'DV_DATE': {
          this.dvDateTime(node, fields, aqlPath);
          break;
        }
        case 'DV_TIME': {
          this.dvTime(node, fields, aqlPath);
          break;
        }
        case 'DV_MULTIMEDIA': {
          this.dvMultimedia(node, fields, aqlPath);
          break;
        }
        default:
          html += `<h3>${node.name} + ${node.rmType}</h3>`;
          console.log('Non-coded ui RmType' + node.name + ' ' + node.rmType);
      }
    } else {
      switch (node.rmType) {
        case 'COMPOSITION': {
          fields.push({
            template: `<h1>${node.name}</h1><p>${
              node.localizedDescriptions?.en || ''
            }</p>`,
          });
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
          fields.push({
            template: `<h3>${node.name}</h3>`,
          });

          break;
        }

        case 'EVENT_CONTEXT':
        case 'EVENT': {
          break;
        }
        default:
          fields.push({
            template: `<h3>${node.name} + ${node.rmType}</h3>`,
          });
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
        console.log(node.id + ' ' + node.rmType);
        this.rmClassifier(node, fields, aqlPath);
      }
      //Below contains all the renderable fields just for reference
      // if (node.inputs && !node.inContext) {
      //   node.inputs.forEach((input: any) => {
      //     fields.push({
      //       key: aqlPath + (input.suffix ? `/${input.suffix}` : ''),
      //       type: 'input',
      //       props: {
      //         label: node.name + ' ' + node.rmType + ' ' + input.suffix,
      //         placeholder: `Enter ${node.name}`,
      //         required: node.min === 1,
      //       },
      //     });
      //   });
      // }

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
