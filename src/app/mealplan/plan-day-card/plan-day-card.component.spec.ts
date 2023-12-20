import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDayCardComponent } from './plan-day-card.component';

describe('PlanDayCardComponent', () => {
  let component: PlanDayCardComponent;
  let fixture: ComponentFixture<PlanDayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanDayCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanDayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
