import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import inputJson from '../assets/term-v1.json'
// import inputJson from '../assets/bloodpressure.json'
import inputJson from '../assets/covidform.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'template-to-html';
  file!: File;
  jsonData: any;
  htmlContent: SafeHtml = ''; // Use SafeHtml for sanitized content

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const rawHtml = this.generateHtml(inputJson.tree);
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
  }

  convertToHtml(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileContent = event.target?.result as string;
      this.jsonData = JSON.parse(fileContent);
      const rawHtml = this.generateHtml(this.jsonData.tree);
      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(rawHtml); // Sanitize the HTML content
    };

    reader.readAsText(file);
  }

  generateHtml(node: any): string {
    if (!node) return '';

    let html = `
      <style>
        label{
          margin-bottom: 0.25rem;
        }
        input{
          width: 100%;
          padding: 0.5rem;
        }
        select {
          width: 100%;
          padding: 0.5rem;
        }
        option{
          padding: 1rem;
        }
      </style>
      <div style="width:95%; display:flex; flex-direction: column; justify-content: center; margin: 0 1rem;">
    `;

    switch (node.rmType) {
      // case 'EVENT_CONTEXT':
      case 'COMPOSITION':
      case 'OBSERVATION':
      case 'SECTION':
        html += `<div><h2>${node.name || node.localizedName}</h2>`;
        if (node.children) {
          node.children.forEach((child: any) => {
            if (child.inContext) return;
            html += this.generateHtml(child);
          });
        }
        html += '</div>';
        break;

      case 'ADMIN_ENTRY':
        html += `<div><h2>${node.name || node.localizedName}</h2>`;
        if (node.children) {
          node.children.forEach((child: any) => {
            if (child.inContext) return;
            html += this.generateHtml(child);
          });
        }
        html += '</div>';
        break;

      case 'DV_DATE_TIME':
        console.log(2);
        if (node.inContext) break;
        html += `<label>${node.name || node.localizedName}</label><input type="datetime-local" /><br>`;
        break;

      case 'DV_QUANTITY':
        html += `<label>${node.name || node.localizedName}</label><input type="number" /><br>`;
        if (node.inputs) {
          node.inputs?.forEach((input: any) => {
            if (input.list) html += `<label> (${input.suffix})</label>`
            if (input.list) html += `<select> (${input.list.map((el: any) => {
              return `<option>${el.value}</option>`
            })})</select>`
            else `<input type = "text" /> <br>`;
          });
        }
        break;

      case 'DV_TEXT':
      case 'DV_MULTIMEDIA':
        console.log(4);
        html += `<label> ${node.name || node.localizedName} </label><input type="text" / > <br>`;
        break;

      case 'DV_CODED_TEXT':
        html += `<label> ${node.name || node.localizedName} </label>`;

        node.inputs?.forEach((input: any) => {
          if (input.type === 'CODED_TEXT' && input.list) {

            let options = input.list?.map((value: any) => `<option>${value.label}</option>`).join('');

            html += `
              <label> (${input.suffix})</label>
              <select>
                ${options}
              </select>
              <br>
            `;

          } else
            html += `<label>(${input.suffix}) </label><input type="text" /> <br>`;
        });
        break;

      case 'DV_DURATION':
        node.inputs?.forEach((input: any) => {
          html += `<label> ${node.name || node.localizedName} (${input.suffix}) </label><input type="number" / > <br>`;
        });
        break;

      case 'DV_PROPORTION':
      case 'DV_IDENTIFIER':
        html += `<label> ${node.name || node.localizedName} </label> <input type="number" / > <br>`;
        break;

      // case 'INTERVAL_EVENT':
      case 'EVENT':
      case 'CLUSTER':
      case 'ELEMENT':
        console.log(5);
        if (node.name !== 'Any event') html += `<div> <h2>${node.name || node.localizedName} </h2>`;
        if (node.children) {
          node.children.forEach((child: any) => {
            html += this.generateHtml(child);
          });
        }
        html += '</div>';
        break;

      case 'PARTY_PROXY':
      case 'CODE_PHRASE':
        console.log(6);
        node.inputs?.forEach((input: any) => {
          html += `<label>${node.name || node.localizedName} (${input.suffix})</label><input type="text" /><br>`;
        });
        break;

      default:
        html += `<p>Unsupported rmType: ${node.rmType}</p>`;
    }

    html += '</div>'

    return html;
  }
}
