import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOfficialsComponent } from './dashboard-officials.component';

describe('DashboardOfficialsComponent', () => {
  let component: DashboardOfficialsComponent;
  let fixture: ComponentFixture<DashboardOfficialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardOfficialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardOfficialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
