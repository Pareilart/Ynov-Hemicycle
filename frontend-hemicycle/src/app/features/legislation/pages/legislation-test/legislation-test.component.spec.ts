import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegislationTestComponent } from './legislation-test.component';

describe('LegislationTestComponent', () => {
  let component: LegislationTestComponent;
  let fixture: ComponentFixture<LegislationTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegislationTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegislationTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
