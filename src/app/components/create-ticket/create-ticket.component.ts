import { HttpService } from '../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../models/Ticket';
import { Category } from '../../models/Category';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogPopupComponent } from '../dialog-popup/dialog-popup.component';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent implements OnInit {
  category!: string;
  subcategory!: string;
  email!: string;
  subject!: string;
  description!: string;
  image!: any;
  tickets: Ticket[] = [];
  categories!: Category[];
  images: any = [];
  imgResultBeforeCompress: any = [];
  imgResultAfterCompress: any = [];
  ImageCompressor: any;
  fileName!: string;
  localCompressed: any = [];
  newID!: number;
  status: string = 'Open';
  localStorageEmail!: any;

  public categoryForm!: FormGroup;

  constructor(
    private http: HttpService,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router,
    private imageCompress: NgxImageCompressService,
    private datepipe: DatePipe,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // Fetch categories
    this.categories = this.dataService.fetchCategories();

    // Validation & declaration for the formgroup
    this.categoryForm = new FormGroup({
      id: new FormControl(''),
      category: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(''),
      createdOn: new FormControl(''),
      status: new FormControl(''),
      date: new FormControl(''),
    });
  }

  // Image > base64 > preview
  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        // Get the filename
        this.fileName = event.target.files[i].name;
        console.log(this.fileName);

        reader.onload = (event: any) => {
          // console.log(event.target.result);
          // this.images.push(event.target.result);
          this.compressFile(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  // Image compressor
  compressFile(image: any) {
    var orientation = -1;
    this.imgResultBeforeCompress = image;
    console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

    this.imageCompress
      .compressFile(image, orientation, 50, 50)
      .then((result) => {
        this.images.push(result);
        this.categoryForm.patchValue({
          image: this.images,
        });
        console.warn(
          'Size in bytes is now:',
          this.imageCompress.byteCount(result)
        );
      });
  }

  // For mat-error
  public hasError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  };

  // Submit button function
  onSubmit() {
    if (this.categoryForm.valid) {
      this.category = this.categoryForm.get('category')?.value.name;
      this.email = this.categoryForm.get('email')?.value;
      console.log(this.email);

      // Generate random ID
      const newID = Math.floor(Math.random() * 100);

      // check if already id is already exist
      var obj = JSON.parse(localStorage.getItem('formdata')!);

      if (obj) {
        for (var i = 0; i < obj.length; i++) {
          if (obj[i].id == newID) {
            const newNewID = Math.floor(Math.random() * 100);
            this.newID = newNewID;
          } else {
            this.newID = newID;
          }
        }
      } else {
        this.newID = newID;
      }

      // Generate auto increment id after getting the last id from localStorage
      // var obj = JSON.parse(localStorage.getItem('formdata')!);
      // for (var i = 0; i < obj.length; i++) {
      //   const id = { id: obj[i].id };

      //   if (obj[i].id >= 1) {
      //     this.newID = obj[i].id + 1;
      //   } else if (obj[i].id == null) {
      //     this.newID = 1;
      //   }
      // }

      this.openDialog(this.newID);

      /**
      // Sending email after 3 days
      var date = new Date();
      let data = {
        email: this.categoryForm.get('email')?.value,
        name: this.categoryForm.get('name')?.value,
        status: this.status,
        createdOn: date,
      };
      this.schedule.schedule(data);
      */

      // this.insertDataIntoLocal();
    } else {
      this.snackBar.open('Please fill in all the details', 'OK', {
        duration: 2000,
      });
    }
  }

  insertDataIntoLocal() {
    // Sets the id to 1 (for the first time creating a ticket)
    // this.categoryForm.patchValue({
    //   id: 1,
    // });

    this.categoryForm.patchValue({
      id: this.newID,
    });

    // console.log(this.category);
    this.categoryForm.patchValue({
      category: this.category,
    });

    this.categoryForm.patchValue({
      status: this.status,
    });

    let currentDateTime = this.datepipe.transform(new Date(), 'short');
    this.categoryForm.patchValue({
      createdOn: currentDateTime,
    });

    let date = new Date();
    this.categoryForm.patchValue({
      date: date,
    });

    // Sending data to localStorage
    const localStorageContent = localStorage.getItem('formdata');
    let formdata = [];
    if (localStorageContent === null) {
      formdata = [];
    } else {
      formdata = JSON.parse(localStorageContent);
    }

    formdata.push(this.categoryForm.value);
    localStorage.setItem('formdata', JSON.stringify(formdata));

    this.snackBar.open('Ticket Submitted', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['viewtickets']);
  }

  openDialog(id: any) {
    const dialogRef = this.dialog.open(DialogPopupComponent, {
      data: {
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.insertDataIntoLocal();

      // get todays date
      const today = new Date();
      console.log('Todays Date:', today);
      // new date variable for ticket after 3 days
      const threedays = new Date(today);
      // add 3 Days from ticket's date
      threedays.setDate(today.getDate() + 3);
      console.log('Three Days added to todays date:', threedays);

      let ticket = {
        id: this.newID,
        email: this.email,
        status: this.status,
        dateOfTicketSubmitted: today,
        dateAfterThreeDays: threedays,
      };

      JSON.stringify(ticket);
      this.http.postTicket(ticket).subscribe(() => {
        console.log('Successfully post ticket to JSON server');
      });
    });
  }
}
