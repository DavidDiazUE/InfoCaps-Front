import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingCourse } from './accounting-course';

describe('AccountingCourse', () => {
  let component: AccountingCourse;
  let fixture: ComponentFixture<AccountingCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingCourse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountingCourse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
