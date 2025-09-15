import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceCourse } from './finance-course';

describe('FinanceCourse', () => {
  let component: FinanceCourse;
  let fixture: ComponentFixture<FinanceCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceCourse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceCourse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
