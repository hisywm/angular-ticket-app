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
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'comment', 'status', 'date'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: any;
  public showComment: { [key: number]: boolean } = {};
  id: any;
  ticketList: any = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    console.log('ID:', this.id);

    var obj = JSON.parse(localStorage.getItem('comments')!);
    // Get only comments where Ticket Id = Id
    const ticket = obj.filter((x: any) => x.id === this.id);
    // console.log(ticket);

    this.dataSource = new MatTableDataSource(ticket);

    for (var i = 0; i < obj.length; i++) {
      const id = { id: obj[i].id };
      this.id = id.id;
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
