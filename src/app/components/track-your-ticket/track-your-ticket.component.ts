import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

@Component({
  selector: 'app-track-your-ticket',
  templateUrl: './track-your-ticket.component.html',
  styleUrls: ['./track-your-ticket.component.scss'],
})
export class TrackYourTicketComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  id: any;
  urlID: any;
  createdOn: any;
  status: any;
  localStorageID: any;
  text!: string;

  public isShowDiv = true;
  public categoryForm!: FormGroup;

  currentStep!: number;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Validation & declaration for the formgroup
    this.categoryForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
    });
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

      this.router.navigate(['viewtickets/trackticket/' + this.localStorageID]);
    }
  }
}
