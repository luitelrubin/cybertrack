import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefamationComponent } from './defamation.component';

describe('DefamationComponent', () => {
  let component: DefamationComponent;
  let fixture: ComponentFixture<DefamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefamationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
