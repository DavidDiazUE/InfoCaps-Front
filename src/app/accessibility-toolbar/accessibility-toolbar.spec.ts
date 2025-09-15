import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibilityToolbar } from './accessibility-toolbar';

describe('AccessibilityToolbar', () => {
  let component: AccessibilityToolbar;
  let fixture: ComponentFixture<AccessibilityToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessibilityToolbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessibilityToolbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
