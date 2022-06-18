import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  APP_INITIALIZER,
} from '@angular/core';
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
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
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
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { MatCardModule } from '@angular/material/card';
import { DialogPopupComponent } from './components/dialog-popup/dialog-popup.component';
import { TrackYourTicketComponent } from './components/track-your-ticket/track-your-ticket.component';
import { StatusCommentListComponent } from './components/status-comment-list/status-comment-list.component';
import { MessageService } from './services/message.service';
import { ScheduleService } from './services/schedule.service';
import { NotificationService } from './services/notification.service';
import { MatTreeModule } from '@angular/material/tree';
import { TreeComponent } from './components/tree/tree.component';
import { TreeNewComponent } from './components/tree-new/tree-new.component';
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
    CommentListComponent,
    DialogPopupComponent,
    TrackYourTicketComponent,
    StatusCommentListComponent,
    TreeComponent,
    TreeNewComponent,
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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
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
    ScheduleService,
    NotificationService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
