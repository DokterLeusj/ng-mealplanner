import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOrLoginFormComponent } from './register-or-login-form.component';

describe('RegisterOrLoginFormComponent', () => {
  let component: RegisterOrLoginFormComponent;
  let fixture: ComponentFixture<RegisterOrLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterOrLoginFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterOrLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
