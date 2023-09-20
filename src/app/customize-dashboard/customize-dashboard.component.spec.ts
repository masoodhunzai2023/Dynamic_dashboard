import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeDashboardComponent } from './customize-dashboard.component';

describe('CustomizeDashboardComponent', () => {
  let component: CustomizeDashboardComponent;
  let fixture: ComponentFixture<CustomizeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
