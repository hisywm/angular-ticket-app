import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCommentListComponent } from './status-comment-list.component';

describe('StatusCommentListComponent', () => {
  let component: StatusCommentListComponent;
  let fixture: ComponentFixture<StatusCommentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusCommentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
