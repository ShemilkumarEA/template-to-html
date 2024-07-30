import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import inputJson from '../assets/term-v1.json'

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

  // convertToHtml(e: any) {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = (event) => {
  //     const fileContent = event.target?.result as string;
  //     this.jsonData = JSON.parse(fileContent);
  //     const rawHtml = this.generateHtml(inputJson.tree);
  //     this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(rawHtml); // Sanitize the HTML content
  //   };

  //   reader.readAsText(file);
  // }

  generateHtml(node: any): string {
    if (!node) return '';

    let html = '';

    switch (node.rmType) {
      case 'COMPOSITION':
      case 'EVENT_CONTEXT':
        console.log(1);
        html += `<div><h2>${node.name || node.localizedName}</h2>`;
        if (node.children) {
          node.children.forEach((child: any) => {
            html += this.generateHtml(child);
          });
        }
        html += '</div>';
        break;

      case 'DV_DATE_TIME':
        console.log(2);
        html += `<label>${node.name || node.localizedName}</label><input type="datetime-local" /><br>`;
        break;

      case 'DV_QUANTITY':
        console.log(3);
        html += `<label>${node.name || node.localizedName}</label><input type="number" /><br>`;
        break;

      case 'DV_TEXT':
        console.log(4);
        html += `<label>${node.name || node.localizedName}</label><input type="text" /><br>`;
        break;

      case 'DV_CODED_TEXT':
        html += `<label>${node.name || node.localizedName}</label>`;
        node.inputs?.forEach((input: any) => {
          html += `<label> (${input.suffix})</label><input type="text" /><br>`;
        });
        break;

      case 'DV_DURATION':
        node.inputs?.forEach((input: any) => {
          html += `<label>${node.name || node.localizedName} (${input.suffix})</label><input type="number" /><br>`;
        });
        break;

      case 'EVENT':
      case 'INTERVAL_EVENT':
      case 'POINT_EVENT':
        console.log(5);
        html += `<div><h3>${node.name || node.localizedName}</h3>`;
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

    return html;
  }
}
