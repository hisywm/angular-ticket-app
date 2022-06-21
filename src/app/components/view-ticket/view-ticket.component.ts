import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { MatSort } from '@angular/material/sort';

export interface Ticket {
  category: string;
  subcategory: string;
  email: string;
  subject: string;
  description: string;
  images: any;
}

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss'],
})
export class ViewTicketComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'category',
    'status',
    'createdOn',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: any;
  id: any;
  text!: string;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    if (localStorage.getItem('formdata') == null) {
      console.log('No data');
      this.text = 'No data.';
      this.dataSource = new MatTableDataSource(obj);
    } else {
      this.text = 'No data matching the input filter.';
      try {
        var obj = JSON.parse(localStorage.getItem('formdata')!);
      } catch (e) {
        console.log('Error', e);
      }
      this.dataSource = new MatTableDataSource(obj);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(element: any) {
    this.dialog.open(DialogContentComponent, {
      data: element,
    });
  }
}
