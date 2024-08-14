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
    // this.fields = this.mapJsonToFormly(fresh);
    // this.fields = this.mapJsonToFormly(covidForm);
    // this.fields = this.mapJsonToFormly(opd);
    // this.fields = this.mapJsonToFormly(allergy);
    this.fields = this.mapJsonToFormly(term1);
    // this.fields = this.mapJsonToFormly(demo);
    // this.res = this.reconstructJson(gen1);
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
          // console.log(this.model);

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

  paths = new Map<
    string,
    string
  >(); /*Paths for intial map ds(no unique values)*/
  aqlPaths = new Map<
    string,
    string
  >(); /*Paths for final map ds(unique values present)*/

  /*Function to append parent path and cleaned path present*/
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

  /*
  Function to find the common point between previous aql path and present aql path and add 
  the unique identifier(number) in between them 
  */
  findDivergence(nextIndex: number, str1: string, str2: string): string {
    let index: number = 0;
    let index2: number = 0;

    // console.log(str1, str2);
    for (let i = 0; i < str2.length && index < str1.length; i++) {
      if (str1[index] === str2[i]) {
        index++;
        index2++;
      } else {
        /* Skip over any closing brackets in str1 */
        while (str1[index] != ']' && index < str1.length) {
          index++;
        }
        while (str2[index2] != ']' && index2 < str2.length) {
          index2++;
        }
        break;
      }
    }
    index++;
    index2++;

    // console.log(nextIndex);

    /*Construct the new path with nextIndex*/
    let path: string =
      str1.substring(0, index) + `${nextIndex}` + str2.slice(index2);

    // console.log(path);

    /* Remove square brackets and anything inside them*/
    return path.replace(/\[.*?\]/g, '');
  }
  /*
  Function to find the parent path i.e to find the last index where a number existed and upto that point is slice and sent back
  */
  findParent(str1: string) {
    const lastIndex = str1.search(/\d(?!.*\d)/);
    const slicedStr = str1.slice(0, lastIndex + 1);
    return slicedStr;
  }
  /*Maping function for jsontree template*/
  mapJsonToFormly(jsonData: any): FormlyFieldConfig[] {
    const fields: FormlyFieldConfig[] = [];
    let index: number = 0;
    /*
      Generates map structure <key,value> pair of <node.aqlPath,cleaned Aqlpath>
     */
    const genAqlPaths = (node: any) => {
      const aqlPath = node.aqlPath.replace(/\[.*?\]/g, '');
      this.aqlPaths.set(node.aqlPath, aqlPath);
      if (node.children) {
        node.children.forEach((child: any) => genAqlPaths(child));
      }
    };
    /*
    Function to generate unique paths from the data structure that is set in the previous function (map)
    */
    const genPaths = (node: any, parentPath: string) => {
      const cleanedAqlPath = node.aqlPath.replace(/\[.*?\]/g, '');
      let prevPath: string = '';
      let aqlPath = '';
      // console.log(parentPath);

      /*Function to set the basepath based on existance of a previous path(parent path) or not*/
      let baseAqlPath = parentPath
        ? this.stripString(parentPath, cleanedAqlPath)
        : cleanedAqlPath;
      // console.log(baseAqlPath);

      /*Determine the next available index for this path*/
      const nextIndex = this.pathIndexArray[baseAqlPath] || 0;
      // console.log(nextIndex);

      /*Iterate through the preset map (node.aqlPath,cleanedpath) for the repeated paths with square bracket values*/
      for (const [key, value] of this.aqlPaths.entries()) {
        // console.log(key, value);
        if (cleanedAqlPath === value) {
          prevPath = key;
          break; // Exit the loop after the first match
        }
      }
      // console.log(prevPath);

      /*If nexIndex>0 which means that the path already exists to make it unique find the difference between their node.aqlpaths,
      prevoius node.aqlPath is determined from the previous step*/
      if (nextIndex > 0) {
        aqlPath = this.findDivergence(nextIndex, prevPath, node.aqlPath);
        // console.log(aqlPath);
      } else {
        aqlPath = baseAqlPath;
      }
      // console.log(aqlPath);

      /* Update the next available index for this path*/
      this.pathIndexArray[baseAqlPath] = nextIndex + 1;

      /*Push the paths that we will be using in formly fields for unique paths*/
      this.paths.set(node.aqlPath, aqlPath);

      /*Determine the parent path so if children exists then parent path is set with the modifications done earlier*/
      if (nextIndex - 1 > 0) aqlPath = this.findParent(aqlPath);

      /*Iterate through the children*/
      if (node.children) {
        node.children.forEach((child: any) => genPaths(child, aqlPath));
      }
    };
    /*Iterate through each node*/
    const processNode = (node: any, parentPath: string = '') => {
      var aqlPath = this.paths.get(node.aqlPath);

      // console.log(aqlPath);
      if (aqlPath != undefined)
        if (!node.inContext) {
          /** If node doesnt not have inContext then set that field as false and send to rmClassifier else send true*/
          this.rmClassifier(node, fields, aqlPath, false);
        } else {
          this.rmClassifier(node, fields, aqlPath, true);
        }
      /**Iterate recursively if children node exists in it  */
      if (node.children) {
        node.children.forEach((child: any) => processNode(child, aqlPath));
      }
    };

    /*Calls genaqlpaths to intitally generate all aqlpaths & cleanedAqlpaths in map ds*/
    genAqlPaths(jsonData.tree);
    console.log(this.aqlPaths);

    /*Calls genpaths to  generate unique paths from  aqlpaths & cleanedAqlpaths map and store it in another map ds*/
    genPaths(jsonData.tree, '');
    console.log(this.paths.values());

    /**Processing of nodes or node traversal beginds here */
    processNode(jsonData.tree);

    return fields;
  }
  /*Post processing of json for creation of array of objects in certain cases*/
  reconstructJson(currenObj: any): any {
    const result: any = {};

    /* First, find all unique base keys and push into map if repeated then increment value*/
    const keyMap = new Map<string, number>();
    for (const key in currenObj) {
      const baseKey = key.replace(/\d+$/, ''); // Remove trailing digits
      if (keyMap.has(baseKey)) {
        keyMap.set(baseKey, keyMap.get(baseKey)! + 1);
      } else {
        keyMap.set(baseKey, 1);
      }
    }

    /* Process each base key*/
    for (const [baseKey, count] of keyMap) {
      if (count > 1) {
        /* If there are multiple similar keys, create an array of object*/
        result[baseKey] = [];
        for (let i = 0; i < count; i++) {
          const fullKey = i === 0 ? baseKey : `${baseKey}${i}`;
          result[baseKey].push(this.reconstructJson(currenObj[fullKey]));
        }
      } else {
        /* Otherwise, just copy the value*/
        result[baseKey] =
          this.getType(currenObj[baseKey]) === 'object'
            ? this.reconstructJson(currenObj[baseKey])
            : currenObj[baseKey];
      }
    }

    return result;
  }
  /*
  Data types in json 
   */
  getType(p: any) {
    if (Array.isArray(p)) return 'array';
    else if (typeof p == 'string') return 'string';
    else if (typeof p == 'number') return 'number';
    else if (p != null && typeof p == 'object') return 'object';
    else return 'other';
  }

  /*Final function for submitting*/
  onSubmit(model: any) {
    // console.log(model);

    /*Intially created a nestedjson from model*/
    const nestedJson = this.createNestedJson(model);
    // console.log(nestedJson);

    /*Modify unique paths to create array of objects*/
    const reconstructJson = this.reconstructJson(nestedJson);
    console.log(reconstructJson);
  }
}
