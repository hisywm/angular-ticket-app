import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'src/app/services/message.service';
import { HttpService } from 'src/app/services/http.service';
import { Ticket } from 'src/app/models/Ticket';

interface Option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss'],
})
export class UpdateStatusComponent implements OnInit {
  id: any;
  name!: string;
  comment!: string;
  date: any;
  status!: string;
  images: any = [];
  email: any;
  subject: any;
  ticket!: Ticket;
  dateOfTicketSubmitted: any;
  dateAfterThreeDays: any;

  localStorageID: any;
  public categoryForm!: FormGroup;

  options: Option[] = [
    { value: 'Open', viewValue: 'Open' },
    { value: 'In Progress', viewValue: 'In Progress' },
    { value: 'Closed', viewValue: 'Closed' },
  ];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private datepipe: DatePipe,
    private snackBar: MatSnackBar,
    private message: MessageService,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    this.categoryForm = new FormGroup({
      id: new FormControl(''),
      status: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
      date: new FormControl(''),
    });
  }

  openDialog(id: any) {
    this.dialog.open(DialogContentComponent, {
      data: {
        id: id,
      },
    });
  }

  // For mat-error
  public hasError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  };

  // Submit button function
  onSubmit() {
    if (this.categoryForm.valid) {
      this.status = this.categoryForm.get('status')?.value;
      this.categoryForm.patchValue({
        status: this.status,
      });

      this.insertDataIntoLocal();
      this.updateStatusIntoLocal();

      console.log('Comment is:', this.categoryForm.get('comment')?.value);

      // Sending email
      let data = {
        email: this.email,
        name: this.categoryForm.get('name')?.value,
        subject: this.categoryForm.get('subject')?.value,
        comment: this.categoryForm.get('comment')?.value,
      };
      this.message.sendMessage(data);

      // Updating ticket status in JSON-server
      // Get ticket by ID
      this.http.getTickets(this.id).subscribe();

      // Declaring ticket
      let ticket = {
        id: this.id,
        email: this.email,
        status: this.status,
        dateOfTicketSubmitted: this.dateOfTicketSubmitted,
        dateAfterThreeDays: this.dateAfterThreeDays,
      };
      JSON.stringify(ticket);
      this.http.updateTicket(ticket).subscribe(() => {
        console.log('Successfully update ticket to JSON server');
      });
    }
  }

  // Updating status in formdata
  updateStatusIntoLocal() {
    // Get all data from localStorage
    var obj = JSON.parse(localStorage.getItem('formdata')!);

    // Filtering the data that needs to be updated
    const index = obj.findIndex(
      (x: any) => parseInt(x.id) === parseInt(this.id)
    );
    console.log(index);

    let arr = obj[index];
    arr.status = this.status;
    obj[index].status = this.status;

    console.log(obj[index].status);
    console.log(obj[index]);
    console.log(obj);

    console.log('Email is:', obj[index].email);
    this.email = obj[index].email;

    // Re-insert all data including the updated status one
    localStorage.setItem('formdata', JSON.stringify(obj));
  }

  // Creating new localStorage 'comments'
  insertDataIntoLocal() {
    // Sending data to localStorage
    const localStorageContent = localStorage.getItem('comments');
    let comments = [];
    if (localStorageContent === null) {
      comments = [];
    } else {
      comments = JSON.parse(localStorageContent);
    }
    this.categoryForm.patchValue({
      id: this.route.snapshot.params.id,
    });
    this.status = this.categoryForm.get('status')?.value;
    this.categoryForm.patchValue({
      status: this.status,
    });
    this.name = this.categoryForm.get('name')?.value;
    this.categoryForm.patchValue({
      name: this.name,
    });
    this.comment = this.categoryForm.get('comment')?.value;
    this.categoryForm.patchValue({
      comment: this.comment,
    });
    let date = this.datepipe.transform(new Date(), 'short');
    this.categoryForm.patchValue({
      date: date,
    });
    comments.push(this.categoryForm.value);
    localStorage.setItem('comments', JSON.stringify(comments));
    this.snackBar.open('Comment Added', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['viewtickets']);
  }
}
