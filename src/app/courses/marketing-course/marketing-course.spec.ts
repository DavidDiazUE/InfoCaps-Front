import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingCourse } from './marketing-course';

describe('MarketingCourse', () => {
  let component: MarketingCourse;
  let fixture: ComponentFixture<MarketingCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketingCourse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketingCourse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
