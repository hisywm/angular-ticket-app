import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  public sendNotification(data: any) {
    return this.http
      .post('http://localhost:3000/notification', data)
      .subscribe((data) => {
        console.log('Sent Email');
      });
  }
}
