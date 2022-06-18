import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackYourTicketComponent } from './track-your-ticket.component';

describe('TrackYourTicketComponent', () => {
  let component: TrackYourTicketComponent;
  let fixture: ComponentFixture<TrackYourTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackYourTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackYourTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
