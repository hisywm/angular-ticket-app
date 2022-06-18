import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { TreeData } from '../../models/Tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tree-new',
  templateUrl: './tree-new.component.html',
  styleUrls: ['./tree-new.component.scss'],
})
export class TreeNewComponent implements OnInit {
  treeData: TreeData[] = [];

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.http
      .getTreeData()
      .subscribe((treeData) => (this.dataSource.data = treeData));

    this.http
      .getTreeDatas()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  treeControl = new NestedTreeControl<TreeData>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<TreeData>();

  hasChild = (_: number, node: TreeData) =>
    !!node.children && node.children.length > 0;

  //excel button click functionality
  exportExcel() {
    import('xlsx').then((xlsx) => {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
      const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(wb, {
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
