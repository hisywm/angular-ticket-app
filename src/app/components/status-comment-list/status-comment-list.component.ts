import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

export interface Element {
  id: number;
  name: string;
  comment: string;
  date: string;
}

@Component({
  selector: 'app-status-comment-list',
  templateUrl: './status-comment-list.component.html',
  styleUrls: ['./status-comment-list.component.scss'],
})
export class StatusCommentListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'comment', 'status', 'date'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: any;
  public showComment: { [key: number]: boolean } = {};
  id: any;
  ticketList: any = [];
  text!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get Ticket ID
    this.id = this.route.snapshot.params.id;
    console.log('ID:', this.id);

    var obj = JSON.parse(localStorage.getItem('comments')!);
    // Get only comments where Ticket Id = Id

    if (localStorage.getItem('comments') == null) {
      console.log('No data');
      this.text = 'No data.';
      this.dataSource = new MatTableDataSource(ticket);
    } else {
      this.text = 'No data.';
      try {
        var ticket = obj.filter((x: any) => x.id === this.id);
      } catch (e) {
        console.log('Error', e);
      }
      this.dataSource = new MatTableDataSource(ticket);
    }
    // this.dataSource.filterPredicate = (data: Element) => {
    //   return data.id == 1;
    // };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  toggleText(elementId: any) {
    this.showComment[elementId] = !this.showComment[elementId];
  }
}
