import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  id: any;
  category: any;
  subcategory: any;
  date: any;
  createdOn: any;
  description: any;
  email: any;
  subject: any;
  status: any;

  constructor(public notification: NotificationService) {}

  ngOnInit(): void {
    this.checkStatusAfterThreeDays();
  }

  // send email if status is still open after 3 days
  checkStatusAfterThreeDays() {
    var obj = JSON.parse(localStorage.getItem('formdata')!);
    const ticket = obj;
    for (var i = 0; i < obj.length; i++) {
      console.log(i, obj[i]);
      this.status = ticket[i].status;
      this.date = ticket[i].date;
      this.email = ticket[i].email;

      // get todays date
      const today = new Date();
      console.log('Todays Date:', today);

      // get created ticket's date (from localStorage)
      const currentDate = new Date(this.date);
      console.log('localStorage Date:', currentDate);

      // new date variable for ticket after 3 days
      const threedays = new Date(this.date);
      // add 3 Days from ticket's date
      threedays.setDate(currentDate.getDate() + 3);
      console.log('Three Days added to localStorage:', threedays);

      //if date has passed 3 days and status is open, it will send an email
      if (this.status == 'Open' && threedays <= today) {
        console.log('This Ticket has passed 3 days and Status is still Open');
        let data = {
          email: this.email,
          date: this.date,
          status: this.status,
        };
        this.notification.sendNotification(data);
        // this.notification.getData(data);
      } else {
        console.log('This Ticket has not yet passed 3 days');
      }
    }

    // console.log(ticket[0].status);
    // console.log(ticket[this.urlID - 1].status);

    // const testDate = new Date(Date.now() + 5000);
  }
}
