import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
})
export class DialogContentComponent implements OnInit {
  id: any;
  category!: string;
  subcategory!: string;
  email!: string;
  subject!: string;
  description: any;
  createdOn: any;
  status: any;
  images: any = [];

  show: boolean = false;
  buttonName: string = 'Show';

  localStorageID: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.category = this.data.category;
    this.subcategory = this.data.subcategory;
    this.email = this.data.email;
    this.subject = this.data.subject;
    this.description = this.data.description;
    this.createdOn = this.data.createdOn;
    this.status = this.data.status;
    this.images = this.data.image;

    var obj = JSON.parse(localStorage.getItem('formdata')!);
    for (var i = 0; i < obj.length; i++) {
      const id = { id: obj[i].id };
      this.localStorageID = id.id;
      if (this.data.id == this.localStorageID) {
        const ticket = [
          {
            id: obj[i].id,
            category: obj[i].category,
            subcategory: obj[i].subcategory,
            email: obj[i].email,
            subject: obj[i].subject,
            description: obj[i].description,
            createdOn: obj[i].createdOn,
            status: obj[i].status,
            images: obj[i].image,
          },
        ];

        this.id = obj[i].id;
        this.category = obj[i].category;
        this.subcategory = obj[i].subcategory;
        this.email = obj[i].email;
        this.subject = obj[i].subject;
        this.description = obj[i].description;
        this.createdOn = obj[i].createdOn;
        this.status = obj[i].status;
        this.images = obj[i].image;
        break;
      }
    }
  }

  toggleText() {
    this.show = !this.show;

    if (!this.show) {
      this.buttonName = 'Show';
    } else {
      this.buttonName = 'Hide';
    }
  }
}
