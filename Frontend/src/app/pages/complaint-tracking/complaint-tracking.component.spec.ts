import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintTrackingComponent } from './complaint-tracking.component';

describe('ComplaintTrackingComponent', () => {
  let component: ComplaintTrackingComponent;
  let fixture: ComponentFixture<ComplaintTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComplaintTrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
