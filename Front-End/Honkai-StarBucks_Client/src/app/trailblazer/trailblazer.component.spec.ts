import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailblazerComponent } from './trailblazer.component';

describe('TrailblazerComponent', () => {
  let component: TrailblazerComponent;
  let fixture: ComponentFixture<TrailblazerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrailblazerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrailblazerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
