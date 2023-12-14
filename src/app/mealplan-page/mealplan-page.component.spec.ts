import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealplanPageComponent } from './mealplan-page.component';

describe('MealplanPageComponent', () => {
  let component: MealplanPageComponent;
  let fixture: ComponentFixture<MealplanPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealplanPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealplanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
