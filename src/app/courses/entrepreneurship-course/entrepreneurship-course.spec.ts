import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurshipCourse } from './entrepreneurship-course';

describe('EntrepreneurshipCourse', () => {
  let component: EntrepreneurshipCourse;
  let fixture: ComponentFixture<EntrepreneurshipCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepreneurshipCourse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepreneurshipCourse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
