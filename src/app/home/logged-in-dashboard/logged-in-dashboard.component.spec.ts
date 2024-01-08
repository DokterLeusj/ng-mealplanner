import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInDashboardComponent } from './logged-in-dashboard.component';

describe('LoggedInDashboardComponent', () => {
  let component: LoggedInDashboardComponent;
  let fixture: ComponentFixture<LoggedInDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedInDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoggedInDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
