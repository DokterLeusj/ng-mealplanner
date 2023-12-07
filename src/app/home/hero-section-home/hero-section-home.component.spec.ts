import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSectionHomeComponent } from './hero-section-home.component';

describe('HeroSectionHomeComponent', () => {
  let component: HeroSectionHomeComponent;
  let fixture: ComponentFixture<HeroSectionHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroSectionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
