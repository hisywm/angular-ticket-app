import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/Ticket';
import { TreeData } from '../models/Tree';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = 'http://localhost:5000/tickets';

  constructor(private http: HttpClient) {}

  postTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket, httpOptions);
  }

  updateTicket(ticket: Ticket): Observable<Ticket> {
    const url = `${this.apiUrl}/${ticket.id}`;
    return this.http.patch<Ticket>(url, ticket, httpOptions);
  }

  getTickets(id: any) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Ticket>(url);
  }

  private treeUrl = 'http://localhost:5000/treeData';

  getTreeData(): Observable<TreeData[]> {
    return this.http.get<TreeData[]>(this.treeUrl);
  }

  getTreeDatas() {
    return new Promise((resolve, reject) => {
      this.http.get<TreeData[]>(this.treeUrl).subscribe((res) => {
        console.log(res);

        resolve(res);
      });
    });
  }

  // uploadImage(image: File): Observable<Response> {
  //   const formData = new FormData();
  //   formData.append('image', image);
  //   return this.http.post<Response>(this.apiUrl, formData);
  // }

  // deleteTask(ticket: Ticket): Observable<Task> {
  //   const url = `${this.apiUrl}/${ticket.id}`;
  //   return this.http.delete<Task>(url);
  // }
}
