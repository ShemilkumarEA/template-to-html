import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import jsonData from '../assets/bloodpressure.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Ehr';
  form = new FormGroup({});
  model = { };
  fields: FormlyFieldConfig[] = [];

  ngOnInit(): void {
    this.fields = this.mapJsonToFormly(jsonData);
  }

  mapJsonToFormly(jsonData: any): FormlyFieldConfig[] {
    const fields: FormlyFieldConfig[] = [];

    const processNode = (node: any, parentPath: string = '') => {
      const aqlPath = parentPath + node.aqlPath;

      if (node.inputs) {
        node.inputs.forEach((input: any) => {
          fields.push({
            key: aqlPath + (input.suffix ? `/${input.suffix}` : ''),
            type: 'input',
            props: {
              label: node.name,
              placeholder: `Enter ${node.name}`,
              required: node.min === 1,
            }
          },
          );
        });
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
  }
}
