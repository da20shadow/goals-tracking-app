import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgentTasksComponent } from './urgent-tasks.component';

describe('UrgentTasksComponent', () => {
  let component: UrgentTasksComponent;
  let fixture: ComponentFixture<UrgentTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrgentTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrgentTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
