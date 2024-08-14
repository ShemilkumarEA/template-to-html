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
                  label: node.name + ' (units)',
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
              const modelKey: string = aqlPath + '/_type';
              this.model = {
                ...this.model,
                [modelKey]: 'DV_QUANTITY',
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
          console.log(this.model);

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
            [modelKey + 'archetype_details' + '/archetype_id' + '/value']:
              node.nodeId,
            [modelKey + 'archetype_details' + '/template_id' + '/value']:
              node.name,
            [modelKey + 'archetype_details' + '/rm_version']: '1.0.1', // Not sure about the value here
          };
          break;
        }
        case 'CODE_PHRASE':
          {
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
            if (node.id == 'encoding')
              this.model = {
                ...this.model,
                [modelKey + '/terminology_id' + '/_type']: 'TERMINOLOGY_ID',
                [modelKey + '/terminology_id' + '/value']:
                  'IANA_character-sets',
                [modelKey + '/code_string']: 'UTF-8',
              };
          }
          break;
        case 'PARTY_PROXY':
          const modelKey: string = aqlPath;
          this.model = {
            ...this.model,
            [modelKey + '/_type']: 'PARTY_SELF',
          };
          break;
        case 'OBSERVATION':
          {
            if (!inContext)
              fields.push({
                template: `<h3>${node.name}</h3>`,
              });
            const modelKey: string = aqlPath;
            this.model = {
              ...this.model,
              [modelKey + '/_type']: node.rmType,
              [modelKey + '/name' + '/_type']: 'DV_TEXT',
              [modelKey + '/name' + '/value']: node.name,
              [modelKey + '/archetype_node_id']: node.nodeId,
              [modelKey + '/data' + '/name' + '/_type']: 'DV_TEXT',
              [modelKey + '/data' + '/name' + '/value']: 'History',
              [modelKey + '/data' + '/archetype_node_id']: node.children
                ?.flatMap((item) => item.aqlPath)[0]
                .split('/')[2]
                .substring(5, 11),
              [modelKey + '/archetype_details' + '/archetype_id' + '/value']:
                node.nodeId,
              [modelKey + '/archetype_details' + '/template_id' + '/value']: '',
              [modelKey + '/archetype_details' + '/rm_version']: '1.0.1', // Not sure about the value here
            };
          }
          break;
        case 'INTERVAL_EVENT':
        case 'SECTION':
        case 'ADMIN_ENTRY':
        case 'POINT_EVENT':
        case 'INSTRUCTION':
        case 'ACTIVITY':
        case 'EVALUATION':
        case 'CLUSTER': {
          if (!inContext)
            fields.push({
              template: `<h3>${node.name}</h3>`,
            });
          const modelKey: string = aqlPath;
          this.model = {
            ...this.model,
            [modelKey + '/_type']: node.rmType,
            [modelKey + '/name' + '/_type']: 'DV_TEXT',
            [modelKey + '/name' + '/value']: node.name,
            [modelKey + '/archetype_node_id']: node.nodeId,
          };
          break;
        }
        case 'ELEMENT':
          break;
        case 'EVENT_CONTEXT': {
          const modelKey: string = aqlPath;
          this.model = {
            ...this.model,
            [modelKey + '/start_time' + '/value']: '2024-08-06T07:10:28.502Z', //HardCoded value
            [modelKey + '/other_context' + '/_type']: 'ITEM_TREE',
            [modelKey + '/other_context' + '/archetype_node_id']: 'at0001',
            [modelKey + '/other_context' + '/name' + '/_type']: 'DV_TEXT',
            [modelKey + '/other_context' + '/name' + '/value']: 'Tree',
            [modelKey + '/participations']: [],
          };
          break;
        }
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

  paths = new Map<string, string>();
  aqlPaths = new Map<string, string>();
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
  findIndex(str1: string, str2: string): number {
    let index: number = 0;

    for (let i = 0; i < str2.length; i++) {
      if (str1[index] == str2[i]) {
        index++;
      } else {
        break;
      }
    }

    return index;
  }

  findDivergence(nextIndex: number, str1: string, str2: string): string {
    let index: number = 0;

    // console.log(str1, str2);
    for (let i = 0; i < str2.length && index < str1.length; i++) {
      if (str1[index] === str2[i]) {
        index++;
      } else {
        // Skip over any closing brackets in str1
        while (str1[index] != ']' && index < str1.length) {
          index++;
        }
        break;
      }
    }
    index++;

    // console.log(nextIndex);

    // Construct the new path with nextIndex
    let path: string =
      str1.substring(0, index) + `${nextIndex}` + str2.slice(index);

    // console.log(path);

    // Remove square brackets and anything inside them
    return path.replace(/\[.*?\]/g, '');
  }

  findParent(str1: string) {
    const lastIndex = str1.search(/\d(?!.*\d)/);
    const slicedStr = str1.slice(0, lastIndex + 1);
    return slicedStr;
  }

  mapJsonToFormly(jsonData: any): FormlyFieldConfig[] {
    const fields: FormlyFieldConfig[] = [];
    let index: number = 0;
    const genAqlPaths = (node: any) => {
      const aqlPath = node.aqlPath.replace(/\[.*?\]/g, '');
      this.aqlPaths.set(node.aqlPath, aqlPath);
      if (node.children) {
        node.children.forEach((child: any) => genAqlPaths(child));
      }
    };

    const genPaths = (node: any, parentPath: string) => {
      const cleanedAqlPath = node.aqlPath.replace(/\[.*?\]/g, '');
      // console.log(parentPath);
      let aqlPath = '';
      let baseAqlPath = parentPath
        ? this.stripString(parentPath, cleanedAqlPath)
        : cleanedAqlPath;
      // const baseAqlPath = this.stripString(parentPath, cleanedAqlPath);
      // console.log(baseAqlPath);
      // Determine the next available index for this path
      const nextIndex = this.pathIndexArray[baseAqlPath] || 0;
      // console.log(nextIndex);
      let prevPath: string = '';
      for (const [key, value] of this.aqlPaths.entries()) {
        // console.log(key, value);
        if (cleanedAqlPath === value) {
          prevPath = key;
          break; // Exit the loop after the first match
        }
      }

      // console.log(prevPath);

      if (nextIndex > 0) {
        aqlPath = this.findDivergence(nextIndex, prevPath, node.aqlPath);
        // console.log(aqlPath);
      } else {
        aqlPath = baseAqlPath;
      }
      // console.log(aqlPath);

      // Update the next available index for this path
      this.pathIndexArray[baseAqlPath] = nextIndex + 1;
      this.paths.set(node.aqlPath, aqlPath);
      if (nextIndex - 1 > 0) aqlPath = this.findParent(aqlPath);
      if (node.children) {
        node.children.forEach((child: any) => genPaths(child, aqlPath));
      }
    };
    const processNode = (node: any, parentPath: string = '') => {
      var aqlPath = this.paths.get(node.aqlPath);

      // console.log(aqlPath);
      if (aqlPath != undefined)
        if (!node.inContext) {
          this.rmClassifier(node, fields, aqlPath, false);
        } else {
          this.rmClassifier(node, fields, aqlPath, true);
        }

      if (node.children) {
        node.children.forEach((child: any) => processNode(child, aqlPath));
      }
    };
    genAqlPaths(jsonData.tree);
    // console.log(this.aqlPaths);
    genPaths(jsonData.tree, '');
    console.log(this.paths.values());
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
    // console.log(model);

    const nestedJson = this.createNestedJson(model);

    // console.log(nestedJson);
    // this.reconstructJson(nestedJson);
    const reconstructJson = this.reconstructJson(nestedJson);
    console.log(reconstructJson);
  }
}
