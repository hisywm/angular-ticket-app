import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  public sendMessage(data: any) {
    return this.http
      .post('http://localhost:3000/sendmail', data)
      .subscribe((data) => {
        console.log('Sent');
      });
  }
}
