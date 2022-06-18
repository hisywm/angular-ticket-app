import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

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
    'subcategory',
    'status',
    'createdOn',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: any;
  id: any;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // Get all data from formdata
    var obj = JSON.parse(localStorage.getItem('formdata')!);

    // Set data to dataSource
    this.dataSource = new MatTableDataSource(obj);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(element: any) {
    this.dialog.open(DialogContentComponent, {
      data: element,
    });
  }
}
