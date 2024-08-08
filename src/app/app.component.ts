import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import bloodpressure from '../assets/bloodpressure.json';
import fresh from '../assets/freshbp.json';
import covidForm from '../assets/covidform.json';
import opd from '../assets/opd.json';
import allergy from '../assets/allergy.json';
import term1 from '../assets/term-v1.json';
import demo from '../assets/demo.v0.json';
import { Children } from './models/genModels.interface';

interface FlatObject {
  [key: string]: any;
}

interface NestedObject {
  [key: string]: any;
}

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
  modelKey: string = '';

  ngOnInit(): void {
    this.fields = this.mapJsonToFormly(fresh);
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
            fields.push({
              key: aqlPath + `/${child.suffix}`,
              type: 'input',
              templateOptions: {
                label: node.name + ' : ',
                placeholder: `Enter ${node.name}`,
                required: node.min === 1,
                min: child.validation?.range?.min,
                max: child.validation?.range?.max,
                type: 'number',
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
                key: aqlPath + `/${child.suffix}`,
                type: 'select',
                templateOptions: {
                  label: node.name + ' (unit)',
                  options: options,
                },
              });
              // fields.push({
              //   key: aqlPath + `/${child.suffix}`,
              //   type: 'select',
              //   templateOptions: {
              //     label: node.name + ' (unit)',
              //     options: options,
              //   },
              //   defaultValue: 'This is a default value',
              //   hide: true,
              // });
              const modelKey: string = aqlPath + `/test`;
              this.model = {
                ...this.model,
                [modelKey]: 'This is harcoded value',
              };
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
            type: 'number',
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
          this.dvDate(node, fields, aqlPath);
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
          console.log('Non-coded UI RmType: ' + node.name + ' ' + node.rmType);
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
            'Non-coded structure RmType: ' + node.name + ' ' + node.rmType
          );
      }
    }
  }

  //Converting the nested object to json
  convertToNestedObject(flatObject: FlatObject): NestedObject {
    const result: NestedObject = {};

    for (const key in flatObject) {
      if (flatObject.hasOwnProperty(key)) {
        const value = flatObject[key];
        const path = key.split('/');

        let current = result;
        for (let i = 0; i < path.length; i++) {
          const segment = path[i];
          if (!current[segment]) {
            current[segment] = {};
          }
          if (i === path.length - 1) {
            current[segment] = value;
          } else {
            current = current[segment];
          }
        }
      }
    }

    return result;
  }

  pathIndexArray: { [key: string]: number } = {};

  paths: string[] = [];

  mapJsonToFormly(jsonData: any): FormlyFieldConfig[] {
    const fields: FormlyFieldConfig[] = [];

    const processNode = (node: any, parentPath: string = '') => {
      // Remove text inside square brackets from AQL path
      const cleanedAqlPath = node.aqlPath.replace(/\[.*?\]/g, '');
      const baseAqlPath = cleanedAqlPath;

      // Determine the next available index for this path
      const nextIndex = this.pathIndexArray[baseAqlPath] || 0;

      // Append the index to the aqlPath if more than one occurrence
      const aqlPath = nextIndex > 0 ? `${baseAqlPath}` : baseAqlPath;

      // Update the next available index for this path
      this.pathIndexArray[baseAqlPath] = nextIndex + 1;
      console.log(aqlPath);
      if (!node.inContext) {
        this.rmClassifier(node, fields, aqlPath);
      }

      if (node.children) {
        node.children.forEach((child: any) => processNode(child, aqlPath));
      }
    };

    processNode(jsonData.tree);

    return fields;
  }

  onSubmit(model: any) {
    console.log(model);
    console.log(this.convertToNestedObject(model));
  }
}
