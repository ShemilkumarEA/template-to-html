import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import inputJson2 from '../assets/bloodpressure.json';
import covidForm from '../assets/covidform.json';

interface TreeNode {
  id: string;
  name: string;
  rmType: string;
  min: number;
  max: number;
  aqlPath: string;
  children?: TreeNode[];
  inContext?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'template-to-html';
  jsonData: any;
  htmlContent: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}
  html: string = '';

  ngOnInit() {
    // console.log('Input JSON:', inputJson.tree);
    // const rawHtml = this.printNodeIds(inputJson2.tree);
    const rawHtml = this.printNodeIds(covidForm.tree);
    console.log('Generated HTML:', rawHtml);
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
  }
  dvQuantity(node: any): string {
    let html: string = '';
    html += `<p>${node.id}</p>`;
    if (node.inputs) {
      node.inputs.forEach((child: any) => {
        switch (child.suffix) {
          case 'magnitude': {
            html += `<input type="number" id="${child.suffix}_magnitude" name="${child.suffix}_magnitude" min="${child.validation?.range.min}" max="${child.validation?.range.max}">`;
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
    html += `<p>${node.id}</p>`;
    if (node.inputs) {
      node.inputs.forEach((child: any) => {
        html += `<label for="${child.suffix}_unit">${child.suffix}:</label>`;
        //TO Check Below range Validation is
        html += `<input type="number" id="${child.suffix}_magnitude" name="${child.suffix}_magnitude" min="${child.validation.range.min}" max="${child.validation.range.max}">`;
      });
    }
    return html;
  }
  dvCodedText(node: any): string {
    let html: string = '';
    html += `<p>${node.id}</p>`;
    if (node.inputs) {
      node.inputs.forEach((child: any) => {
        if (child.list && child.list.length > 0) {
          html += `<select id="${child.suffix}_unit" name="${child.suffix}_unit">`;
          html += `<option></option>`;
          child.list.forEach((item: any) => {
            html += `<option value="${item.value}">${item.label}</option>`;
          });
          html += `</select>`;
        }
      });
    }
    return html;
  }

  rmClassifier(node: any): string {
    let html = '';
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
        case 'DV_DATA_TIME': {
          html += `<p>${node.id}</p>`;
          break;
        }
        default:
          break;
      }
    } else {
      switch (node.rmType) {
        case 'COMPOSITION': {
          html += `<h1>${node.id}</h1><br>`;
          break;
        }
        case 'OBSERVATION': {
          html += `<h3>${node.id}</h3>`;
          break;
        }
        case 'INTERVAL_EVENT': {
          html += `<h3>${node.id}</h3>`;
          break;
        }
        default:
        // console.log('Non ui RmType' + node.rmType);
      }
    }
    return html;
  }

  printNodeIds(node: any): string {
    let html = '';
    if (!node.inContext) {
      console.log(node.id + ': ' + node.rmType);
      html += this.rmClassifier(node);
    }

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        html += this.printNodeIds(child);
      }
    }

    return html;
  }
}
