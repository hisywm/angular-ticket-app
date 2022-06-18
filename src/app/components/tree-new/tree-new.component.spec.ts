import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeNewComponent } from './tree-new.component';

describe('TreeNewComponent', () => {
  let component: TreeNewComponent;
  let fixture: ComponentFixture<TreeNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
