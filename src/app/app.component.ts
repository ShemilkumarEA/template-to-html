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
import gen1 from '../assets/gen/gen1.json';
import { Children, List } from './models/genModels.interface';
type JsonObject = { [key: string]: any };

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
  res: any = {};

  ngOnInit(): void {
    this.fields = this.mapJsonToFormly(fresh);
    // this.fields = this.mapJsonToFormly(covidForm);
    // this.fields = this.mapJsonToFormly(opd);
    // this.fields = this.mapJsonToFormly(allergy);
    // this.fields = this.mapJsonToFormly(term1);
    // this.fields = this.mapJsonToFormly(demo);
    // this.res = this.reconstructJson(gen1);
    // console.log(this.res);
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
              const modelKey: string = aqlPath + '/test';
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
    aqlPath: string,
    inContext: boolean
  ): void {
    if (node.rmType.startsWith('DV')) {
      switch (node.rmType) {
        case 'DV_DURATION': {
          if (!inContext) this.dvDuration(node, fields, aqlPath);
          break;
        }
        case 'DV_CODED_TEXT': {
          if (!inContext) this.dvCodedText(node, fields, aqlPath);
          const modelKey: string = aqlPath;
          this.model = {
            ...this.model,
            [modelKey + '/value']: node.inputs
              ?.flatMap(
                (input) => input.list?.flatMap((item) => item.label) || []
              )
              .join(','),
            [modelKey + '/defining_code' + '/terminology_id' + '/_type']:
              'TERMINOLOGY_ID',
            [modelKey + '/defining_code' + '/terminology_id' + '/value']:
              node.inputs?.flatMap((input) => input.terminology).join(','),
            [modelKey + '/defining_code' + '/code_string']: node.inputs
              ?.flatMap(
                (input) => input.list?.flatMap((item) => item.value) || []
              )
              .join(','),
          };
          break;
        }
        case 'DV_QUANTITY': {
          if (!inContext) this.dvQuantity(node, fields, aqlPath);
          break;
        }
        case 'DV_DATE_TIME': {
          if (!inContext)
            if (!inContext) this.dvDateTime(node, fields, aqlPath);
          break;
        }
        case 'DV_TEXT': {
          if (!inContext) this.dvText(node, fields, aqlPath);
          break;
        }
        case 'DV_PROPORTION': {
          if (!inContext) this.dvProportion(node, fields, aqlPath);
          break;
        }
        case 'DV_IDENTIFIER': {
          if (!inContext) this.dvIdentifier(node, fields, aqlPath);
          break;
        }
        case 'DV_BOOLEAN': {
          if (!inContext) this.dvBoolean(node, fields, aqlPath);
          break;
        }
        case 'DV_COUNT': {
          if (!inContext) this.dvCount(node, fields, aqlPath);
          break;
        }
        case 'DV_INTERVAL<DV_DATE_TIME>': {
          if (!inContext) this.dvInterval(node, fields, aqlPath);
          break;
        }
        case 'DV_DATE': {
          if (!inContext) this.dvDate(node, fields, aqlPath);
          break;
        }
        case 'DV_TIME': {
          if (!inContext) this.dvTime(node, fields, aqlPath);
          break;
        }
        case 'DV_MULTIMEDIA': {
          if (!inContext) this.dvMultimedia(node, fields, aqlPath);
          break;
        }
        default:
          console.log('Non-coded UI RmType: ' + node.name + ' ' + node.rmType);
      }
    } else {
      switch (node.rmType) {
        case 'COMPOSITION': {
          if (!inContext) {
            fields.push({
              template: `<h1>${node.name}</h1><p>${
                node.localizedDescriptions?.en || ''
              }</p>`,
            });
          }
          const modelKey: string = aqlPath;
          this.model = {
            ...this.model,
            [modelKey + '_type']: 'COMPOSITION',
            [modelKey + 'name' + '/_type']: 'DV_TEXT',
            [modelKey + 'name' + '/value']: node.name,
            [modelKey + 'archetype_node_id']: node.nodeId,
          };
          break;
        }
        case 'CODE_PHRASE':
          const modelKey: string = aqlPath;

          if (node.id == 'language')
            this.model = {
              ...this.model,
              [modelKey + '/terminology_id' + '/_type']: 'TERMINOLOGY_ID',
              [modelKey + '/terminology_id' + '/value']: 'ISO_639-1',
              [modelKey + '/code_string']: 'en',
            };
          if (node.id == 'territory')
            this.model = {
              ...this.model,
              [modelKey + '/terminology_id' + '/_type']: 'TERMINOLOGY_ID',
              [modelKey + '/terminology_id' + '/value']: 'ISO_3166-1',
              [modelKey + '/code_string']: 'UY',
            };
          break;
        case 'PARTY_PROXY':
          break;
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
          if (!inContext)
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
          // if (!inContext)
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
  createNestedJson(flatJson: { [key: string]: any }): any {
    const nestedJson: any = {};

    Object.keys(flatJson).forEach((key) => {
      const parts = key.split('/').filter((part) => part !== '');
      let currentLevel = nestedJson;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (i === parts.length - 1) {
          currentLevel[part] = flatJson[key];
        } else {
          if (!currentLevel[part]) {
            currentLevel[part] = isNaN(parseInt(parts[i + 1])) ? {} : [];
          }
          currentLevel = currentLevel[part];
        }
      }
    });

    return nestedJson;
  }
  //

  pathIndexArray: { [key: string]: number } = {};

  paths: string[] = [];
  //Function to generate unique path
  stripString(str1: string, str2: string): string {
    let index: number = 0;

    for (let i = 0; i < str2.length; i++) {
      if (str1[index] == str2[i]) {
        index++;
      } else {
        str1 = str1.concat(str2.slice(i));
        break;
      }
    }

    return str1;
  }

  mapJsonToFormly(jsonData: any): FormlyFieldConfig[] {
    const fields: FormlyFieldConfig[] = [];
    let index: number = 0;
    const genPaths = (node: any, parentPath: string = '') => {
      const cleanedAqlPath = node.aqlPath.replace(/\[.*?\]/g, '');

      const baseAqlPath = parentPath
        ? this.stripString(parentPath, cleanedAqlPath)
        : cleanedAqlPath;

      // Determine the next available index for this path
      const nextIndex = this.pathIndexArray[baseAqlPath] || 0;

      // Append the index to the aqlPath if more than one occurrence
      const aqlPath =
        nextIndex > 0 ? `${baseAqlPath}${nextIndex}` : baseAqlPath;

      // Update the next available index for this path
      this.pathIndexArray[baseAqlPath] = nextIndex + 1;
      this.paths.push(aqlPath);
      if (node.children) {
        node.children.forEach((child: any) => genPaths(child, aqlPath));
      }
    };
    const processNode = (node: any, parentPath: string = '') => {
      var aqlPath = this.paths[index++];

      // console.log(aqlPath);
      if (!node.inContext) {
        this.rmClassifier(node, fields, aqlPath, false);
      } else {
        this.rmClassifier(node, fields, aqlPath, true);
      }

      if (node.children) {
        node.children.forEach((child: any) => processNode(child, aqlPath));
      }
    };
    genPaths(jsonData.tree);
    console.log(this.paths);
    processNode(jsonData.tree);

    return fields;
  }

  reconstructJson(currenObj: any): any {
    const result: any = {};

    // First, find all unique base keys
    const keyMap = new Map<string, number>();
    for (const key in currenObj) {
      const baseKey = key.replace(/\d+$/, ''); // Remove trailing digits
      if (keyMap.has(baseKey)) {
        keyMap.set(baseKey, keyMap.get(baseKey)! + 1);
      } else {
        keyMap.set(baseKey, 1);
      }
    }

    // Process each base key
    for (const [baseKey, count] of keyMap) {
      if (count > 1) {
        // If there are multiple similar keys, create an array
        result[baseKey] = [];
        for (let i = 0; i < count; i++) {
          const fullKey = i === 0 ? baseKey : `${baseKey}${i}`;
          result[baseKey].push(this.reconstructJson(currenObj[fullKey]));
        }
      } else {
        // Otherwise, just copy the value
        result[baseKey] =
          this.getType(currenObj[baseKey]) === 'object'
            ? this.reconstructJson(currenObj[baseKey])
            : currenObj[baseKey];
      }
    }

    return result;
  }

  getType(p: any) {
    if (Array.isArray(p)) return 'array';
    else if (typeof p == 'string') return 'string';
    else if (typeof p == 'number') return 'number';
    else if (p != null && typeof p == 'object') return 'object';
    else return 'other';
  }
  onSubmit(model: any) {
    console.log(model);

    const nestedJson = this.createNestedJson(model);

    console.log(nestedJson);
    // this.reconstructJson(nestedJson);
    const reconstructJson = this.reconstructJson(nestedJson);
    console.log(reconstructJson);
  }
}
