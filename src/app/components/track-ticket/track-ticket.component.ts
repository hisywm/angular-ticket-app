import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

// export interface Ticket {
//   category: string;
//   subcategory: string;
//   email: string;
//   subject: string;
//   description: string;
//   images: any;
// }

@Component({
  selector: 'app-track-ticket',
  templateUrl: './track-ticket.component.html',
  styleUrls: ['./track-ticket.component.scss'],
})
export class TrackTicketComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  id: any;
  urlID: any;
  createdOn: any;
  status: any;
  localStorageID: any;
  text!: string;
  date: any;
  email: any;

  public isShowDiv = true;
  public categoryForm!: FormGroup;

  currentStep!: number;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    // Validation & declaration for the formgroup
    this.categoryForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
    });

    this.urlID = this.route.snapshot.params.id;
    // console.log('ID:', this.urlID);

    var obj = JSON.parse(localStorage.getItem('formdata')!);
    const ticket = obj.filter((x: any) => x.id === parseInt(this.urlID));
    // console.log(ticket[0].status);
    // console.log(ticket[this.urlID - 1].status);

    this.status = ticket[0].status;
    this.localStorageID = ticket[0].id;
    this.createdOn = ticket[0].createdOn;
    this.date = ticket[0].date;
    this.email = ticket[0].email;

    if (this.status == 'Open') {
      this.currentStep = 0;
    } else if (this.status == 'In Progress') {
      this.currentStep = 1;
    } else {
      this.currentStep = 2;
    }

    this.isShowDiv = false;

    this.checkStatusAfterThreeDays();
  }

  // send email if status is still open after 3 days
  checkStatusAfterThreeDays() {
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

    // const testDate = new Date(Date.now() + 5000);

    //if date has passed 3 days and status is open, it will send an email
    if (this.status == 'Open' && threedays <= today) {
      console.log('True');
      let data = {
        email: this.email,
      };
      this.notification.sendNotification(data);
    }
  }

  // For mat-error
  public hasError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  };

  openDialog(id: any) {
    this.dialog.open(DialogContentComponent, {
      data: {
        id: id,
      },
    });
  }

  // Submit button function
  onSubmit() {
    // Get value from input
    this.id = this.categoryForm.get('id')?.value;

    // Fetch data from localStorage
    var data = JSON.parse(localStorage.getItem('formdata')!);

    if (data.filter((x: any) => x.id === parseInt(this.id)) == false) {
      this.text = 'No Result.';
      this.snackBar.open('Ticket not found', 'OK', {
        duration: 2000,
      });
      this.isShowDiv = true;
    } else {
      const ticket1 = data.filter((x: any) => x.id === parseInt(this.id));
      console.log('Submitted ticket', ticket1[0]);
      // console.log(ticket[this.urlID - 1].status);

      this.status = ticket1[0].status;
      this.localStorageID = ticket1[0].id;
      this.createdOn = ticket1[0].createdOn;

      if (this.status == 'Open') {
        this.currentStep = 0;
      } else if (this.status == 'In Progress') {
        this.currentStep = 1;
      } else {
        this.currentStep = 2;
      }

      this.isShowDiv = false;
      this.text = '';

      this.router
        .navigate(['viewtickets/trackticket/' + this.localStorageID])
        .then((res) => {
          location.reload();
        });
    }
  }
}
