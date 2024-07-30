import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import inputJson2 from '../assets/bloodpressure.json';

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

  ngOnInit() {
    console.log('Input JSON:', inputJson2.tree);
    const rawHtml = this.printNodeIds(inputJson2.tree);
    console.log('Generated HTML:', rawHtml);
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
  }

  printNodeIds(node: TreeNode): string {
    let html = '';

    if (!node.inContext && !node.children) {
      console.log(node.id);
      html += `<div id="${node.id}">
                <label for="${node.id}">${node.name}</label>
                <input type="text" id="${node.id}" name="${node.id}" />
              </div>`;
    }

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        html += this.printNodeIds(child);
      }
    }

    return html;
  }
}
