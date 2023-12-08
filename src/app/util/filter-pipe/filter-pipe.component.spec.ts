import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPipeComponent } from './filter-pipe.component';

describe('FilterPipeComponent', () => {
  let component: FilterPipeComponent;
  let fixture: ComponentFixture<FilterPipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterPipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
