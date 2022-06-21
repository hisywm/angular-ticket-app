import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TrackTicketComponent } from './components/track-ticket/track-ticket.component';
import { TrackYourTicketComponent } from './components/track-your-ticket/track-your-ticket.component';
import { UpdateStatusComponent } from './components/update-status/update-status.component';
import { ViewTicketComponent } from './components/view-ticket/view-ticket.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'createticket', component: CreateTicketComponent },
  { path: 'viewtickets', component: ViewTicketComponent },
  { path: 'viewtickets/updatestatus/:id', component: UpdateStatusComponent },
  { path: 'viewtickets/trackticket/:id', component: TrackTicketComponent },
  { path: 'track-your-ticket', component: TrackYourTicketComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
