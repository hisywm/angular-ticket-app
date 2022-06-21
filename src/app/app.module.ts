import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { QuillModule } from 'ngx-quill';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewTicketComponent } from './components/view-ticket/view-ticket.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgxImageCompressService } from 'ngx-image-compress';
import { DatePipe } from '@angular/common';
import { TrackTicketComponent } from './components/track-ticket/track-ticket.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';
import { UpdateStatusComponent } from './components/update-status/update-status.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DialogPopupComponent } from './components/dialog-popup/dialog-popup.component';
import { TrackYourTicketComponent } from './components/track-your-ticket/track-your-ticket.component';
import { StatusCommentListComponent } from './components/status-comment-list/status-comment-list.component';
import { MessageService } from './services/message.service';
import { NotificationService } from './services/notification.service';
import { MatTreeModule } from '@angular/material/tree';
import { MatTableExporterModule } from 'mat-table-exporter';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateTicketComponent,
    ViewTicketComponent,
    NotFoundComponent,
    AdminDashboardComponent,
    TrackTicketComponent,
    DialogContentComponent,
    UpdateStatusComponent,
    DialogPopupComponent,
    TrackYourTicketComponent,
    StatusCommentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      theme: 'snow',
    }),
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatTreeModule,
    MatTableExporterModule,
  ],
  providers: [
    NgxImageCompressService,
    DatePipe,
    MessageService,
    NotificationService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
