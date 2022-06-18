import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { saveAs } from 'file-saver';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FolderDataNode {
  name: string;
  id: number;
  numbering: string;
  children?: FolderDataNode[];
}

const TREE_DATA: FolderDataNode[] = [
  {
    name: 'Folder 1',
    id: 1,
    numbering: '1.0',
    children: [
      {
        name: 'Folder 1.1',
        id: 2,
        numbering: '1.1',
        children: [
          {
            name: 'Folder 1.1.1',
            id: 3,
            numbering: '1.1.1',
            children: [],
          },
          {
            name: 'File 1.1.2',
            id: 33,
            numbering: '1.1.2',
            children: [
              { name: 'Folder 1.1.2.1', id: 4, numbering: '1.1.2.1' },
              { name: 'Folder 1.1.2.2', id: 5, numbering: '1.1.2.2' },
              {
                name: 'Folder 1.1.2.3',
                id: 6,
                numbering: '1.1.2.3',
                children: [
                  { name: 'Folder 1.1.2.3.1', id: 7, numbering: '1.1.2.3.1' },
                  { name: 'Folder 1.1.2.3.2', id: 8, numbering: '1.1.2.3.2' },
                ],
              },
              {
                name: 'Folder 1.1.2.4',
                id: 9,
                numbering: '1.1.2.4',
                children: [
                  { name: 'Folder 1.1.2.4.1', id: 10, numbering: '1.1.2.4.1' },
                ],
              },
            ],
          },
          {
            name: 'File 1.1.3',
            id: 11,
            numbering: '1.1.3',
            children: [
              {
                name: 'Folder 1.1.3.1',
                id: 12,
                numbering: '1.1.3.1',
                children: [
                  { name: 'Folder 1.1.3.1.1', id: 13, numbering: '1.1.3.1.1' },
                  { name: 'Folder 1.1.3.1.2', id: 14, numbering: '1.1.3.1.2' },
                  { name: 'Folder 1.1.3.1.3', id: 15, numbering: '1.1.3.1.3' },
                  {
                    name: 'Folder 1.1.3.1.4',
                    id: 16,
                    numbering: '1.1.3.1.4',
                    children: [
                      {
                        name: 'Folder 1.1.3.1.5',
                        id: 17,
                        numbering: '1.1.3.1.5',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {}

  treeControl = new NestedTreeControl<FolderDataNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<FolderDataNode>();

  hasChild = (_: number, node: FolderDataNode) =>
    !!node.children && node.children.length > 0;

  //excel button click functionality
  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(TREE_DATA);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'treeData');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
