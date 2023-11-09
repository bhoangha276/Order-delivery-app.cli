import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEmployeeComponent } from './table-employee.component';

describe('TableEmployeeComponent', () => {
  let component: TableEmployeeComponent;
  let fixture: ComponentFixture<TableEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableEmployeeComponent]
    });
    fixture = TestBed.createComponent(TableEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
