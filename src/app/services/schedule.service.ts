import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  public schedule(data: any) {
    return this.http
      .post('http://localhost:3000/schedule', data)
      .subscribe((data) => {
        console.log('Sent');
      });
  }
}
